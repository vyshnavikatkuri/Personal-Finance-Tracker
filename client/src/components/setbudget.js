// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify"; // Import toast

// const SetBudget = ({ userId }) => {
//   const [category, setCategory] = useState("Food");
//   const [limit, setLimit] = useState("");
//   const [month, setMonth] = useState("2025-05");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/v1/budgets/set", { userId, category, limit, month });
//       toast.success("✅ Budget saved successfully!");
//     } catch (error) {
//       toast.error("❌ Failed to save budget. Please try again.");
//       console.error("Budget save error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
//       <input
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         placeholder="Category"
//       />
//       <input
//         type="number"
//         value={limit}
//         onChange={(e) => setLimit(e.target.value)}
//         placeholder="Limit"
//       />
//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//       />
//       <button type="submit">Set Budget</button>
//     </form>
//   );
// };

// export default SetBudget;
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SetBudget = ({ userid}) => {
  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");
  const [month, setMonth] = useState("2025-05");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedLimit = parseFloat(limit);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      toast.error("Please enter a valid positive number for Limit");
      return;
    }

    try {
      console.log("Sending data:", { userid, category, limit: parsedLimit, month });
      await axios.post(
        "/api/v1/budgets/set",
        { userid, category: category.toLowerCase(), limit: parsedLimit, month },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Budget saved!");
    } catch (error) {
      console.error("Error setting budget:", error.response?.data || error.message);
      toast.error("Failed to set budget");
    }
  };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "10px" }}>
//       <input
//         value={category}
//         onChange={(e) => setCategory(e.target.value.toLowerCase())}
//         placeholder="Category"
//         required
//       />
//       <input
//         type="number"
//         value={limit}
//         onChange={(e) => setLimit(e.target.value)}
//         placeholder="Limit"
//         required
//         min="0.01"
//         step="0.01"
//       />
//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//         placeholder="YYYY-MM"
//         required
//       />
//       <button type="submit">Set Budget</button>
//     </form>
//   );
// };
return (
  <form
    onSubmit={handleSubmit}
    style={{
      display: "flex",
      flexWrap: "wrap",          // handles responsiveness
      alignItems: "center",
      gap: "10px",
      padding: "10px",
      borderRadius: "10px",
    //  backgroundColor: "rgba(255, 255, 255, 0.15)", // transparent white
    // backdropFilter: "blur(8px)",                  // frosted glass effect
    // WebkitBackdropFilter: "blur(8px)",
    opacity:1,
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      maxWidth: "100%",
    }}
  >
    <input
      value={category}
      onChange={(e) => setCategory(e.target.value.toLowerCase())}
      placeholder="Category"
      required
      style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", minWidth: "120px" }}
    />

    <input
      type="number"
      value={limit}
      onChange={(e) => setLimit(e.target.value)}
      placeholder="Limit"
      required
      min="0.01"
      step="0.01"
      style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", width: "100px" }}
    />

    <input
      type="month"
      value={month}
      onChange={(e) => setMonth(e.target.value)}
      required
      style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", width: "120px" }}
    />

    <button
      type="submit"
      style={{
        padding: "8px 12px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      Set Budget
    </button>
  </form>
);
};

export default SetBudget;
