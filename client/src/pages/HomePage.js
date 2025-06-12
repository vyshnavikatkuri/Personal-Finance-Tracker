// import React, { useState, useEffect } from "react";
// import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
// import {
//   UnorderedListOutlined,
//   AreaChartOutlined,
//   EditOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import { toast } from "react-toastify";
// import Layout from "./../components/Layout/Layout";
// import SetBudget from '../components/setbudget';
// import axios from "axios";
// import Spinner from "./../components/Spinner";
// import moment from "moment";
// import Analytics from "../components/Analytics";
// import "../styles/HomePage.css"
// const { RangePicker } = DatePicker;

// const HomePage = () => {
  
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [allTransection, setAllTransection] = useState([]);
//   const [frequency, setFrequency] = useState("7");
//   const [selectedDate, setSelectedate] = useState([]);
//   const [type, setType] = useState("all");
//   const [viewData, setViewData] = useState("table");
//   const [editable, setEditable] = useState(null);

//   //table data
//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//     },
//     {
//       title: "Refrence",
//       dataIndex: "refrence",
//     },
//     {
//       title: "Actions",
//       render: (text, record) => (
//         <div className="editdelete">
//           <EditOutlined
//             className="edit"
//             onClick={() => {
//               setEditable(record);
//               setShowModal(true);
//             }}
//           />
//           <DeleteOutlined
//             className="delete"
            
//             onClick={() => {
//               handleDelete(record);
//             }}
//           />
//         </div>
//       ),
//     },
//   ];

//   //getall transactions

//   //useEffect Hook
//   useEffect(() => {
//     const getAllTransactions = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         setLoading(true);
//         const res = await axios.post("/api/v1/transections/get-transection", {
//           userid: user._id,
//           frequency,
//           selectedDate,
//           type,
//         });
//         setAllTransection(res.data);
//         setLoading(false);
//       } catch (error) {
//         message.error("Fetch Issue With Transaction");
//       }
//     };
//     getAllTransactions();
//   }, [frequency, selectedDate, type, setAllTransection]);

//   //delete handler
//   const handleDelete = async (record) => {
//     try {
//       setLoading(true);
//       await axios.post("/api/v1/transections/delete-transection", {
//         transacationId: record._id,
//       });
//       setLoading(false);
//       message.success("Transaction Deleted!");
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//       message.error("unable to delete");
//     }
//   };

//  const handleSubmit = async (values) => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     setLoading(true);

//     if (editable) {
//       await axios.post("/api/v1/transections/edit-transection", {
//         payload: {
//           ...values,
//           userId: user._id,
//         },
//         transacationId: editable._id,
//       });
//       setLoading(false);
//       message.success("Transaction Updated Successfully");
//     } else {
//       const res = await axios.post("/api/v1/transections/add-transection", {
//         ...values,
//         userId: user._id, // fixed typo from `userid`
//       });

//       if (res.data?.message) {
//         toast.warning(res.data.message); // optional
//       }

//       setLoading(false);
//       message.success("Transaction Added Successfully");
//     }

//     setShowModal(false);
//     setEditable(null);
//   } catch (error) {
//     setLoading(false);
//     message.error("Please fill all fields");
//   }
// };

//   return (
//     <Layout>
//       {loading && <Spinner />}
      

//       <SetBudget userId={userId} />

//       <div className="filters" >
//         <div className="filters1">
//           <h6 style={{color:'white'}}> Select Frequency</h6>
//           <Select value={frequency} onChange={(values) => setFrequency(values)}>
//             <Select.Option value="7">LAST 1 Week</Select.Option>
//             <Select.Option value="30">LAST 1 Month</Select.Option>
//             <Select.Option value="365">LAST 1 year</Select.Option>
//             <Select.Option value="custom">Custom</Select.Option>
//           </Select>
//           {frequency === "custom" && (
//             <RangePicker
//               value={selectedDate}
//               onChange={(values) => setSelectedate(values)}
//             />
//           )}
//         </div>
//         <div className="filters2 ">
//           <h6 style={{color:'white'}}>Select Type</h6>
//           <Select value={type} onChange={(values) => setType(values)}>
//             <Select.Option value="all">ALL</Select.Option>
//             <Select.Option value="income">INCOME</Select.Option>
//             <Select.Option value="expense">EXPENSE</Select.Option>
//           </Select>
//         </div>
//         <div className="switch-icons" >
//           <UnorderedListOutlined
//             className={`mx-3 ${
//               viewData === "table" ? "active-icon" : "inactive-icon"
//             }`}
//             onClick={() => setViewData("table")}
//           />
//           <AreaChartOutlined
//             className={`mx-3 ${
//               viewData === "analytics" ? "active-icon" : "inactive-icon"
//             }`}
//             onClick={() => setViewData("analytics")}
//           />
//         </div>
//         <div>
//           <button
//             className="btn btn-primary"
//             onClick={() => setShowModal(true)}
//           >
//             Add New
//           </button>
//         </div>
//       </div>
//       <div className="content">
//         {viewData === "table" ? (
//           <Table columns={columns} dataSource={allTransection} />
//         ) : (
//           <Analytics allTransection={allTransection} />
//         )}
//       </div>
//       <Modal
//         title={editable ? "Edit Transaction" : "Add Transection"}
//         open={showModal}
//         onCancel={() => setShowModal(false)}
//         footer={false}
//       >
//         <Form
//           layout="vertical"
//           onFinish={handleSubmit}
//           initialValues={editable}
//         >
//           <Form.Item label="Amount" name="amount">
//             <Input type="text" required />
//           </Form.Item>
//           <Form.Item label="Type" name="type">
//             <Select>
//               <Select.Option value="income">Income</Select.Option>
//               <Select.Option value="expense">Expense</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Category" name="category">
//             <Select>
//               <Select.Option value="salary">Salary</Select.Option>
//               <Select.Option value="transportation">Transportation</Select.Option>
//               <Select.Option value="project">Project</Select.Option>
//               <Select.Option value="food">Food</Select.Option>
//               <Select.Option value="movie">Movie</Select.Option>
//               <Select.Option value="bills">Bills</Select.Option>
//               <Select.Option value="medical">Medical</Select.Option>
//               <Select.Option value="fee">Fee</Select.Option>
//               <Select.Option value="tax">TAX</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Date" name="date">
//             <Input type="date" />
//           </Form.Item>
//           <Form.Item label="Reference" name="refrence">
//             <Input type="text"  />
//           </Form.Item>
//           <Form.Item label="Description" name="description">
//             <Input type="text"  />
//           </Form.Item>
//           <div className="d-flex justify-content-end">
//             <button type="submit" className="btn btn-primary">
//               {" "}
//               SAVE
//             </button>
//           </div>
//         </Form>
//       </Modal>
//     </Layout>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import Layout from "./../components/Layout/Layout";
import SetBudget from '../components/setbudget';
import axios from "axios";
import Spinner from "./../components/Spinner";
import NotificationList from "../components/NotificationList";
import moment from "moment";
import Analytics from "../components/Analytics";
import "../styles/HomePage.css";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [userId, setUserId] = useState(null);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="editdelete">
          <EditOutlined
            className="edit"
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="delete"
            
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];


  // Extract userId on component mount
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user && user._id) {
  //     setUserId(user._id);
  //   }
  // }, []);
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?._id) {
    setUserId(user._id);
  }
}, []);


  //get all transactions
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        if (!userId) return; // Wait for userId to be set
        setLoading(true);
        const res = await axios.post("/api/v1/transections/get-transection", {
          userid: userId,
          frequency,
          selectedDate,
          type,
        });
        setAllTransection(res.data);
        setLoading(false);
      } catch (error) {
        message.error("Fetch Issue With Transaction");
        setLoading(false);
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type, userId]);

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transections/delete-transection", {
        transacationId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (!userId) {
        message.error("User not found!");
        return;
      }
      setLoading(true);

      if (editable) {
        await axios.post("/api/v1/transections/edit-transection", {
          payload: {
            ...values,
            userid: userId,
          },
          transacationId: editable._id,
        });
        message.success("Transaction Updated Successfully");
      } else {
        const res = await axios.post("/api/v1/transections/add-transection", {
          ...values,
          userid: userId,
        });

        if (res.data?.message) {
          toast.warning(res.data.message); // optional
        }

        message.success("Transaction Added Successfully");
      }

      setLoading(false);
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Please fill all fields");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      {userId && <NotificationList userid={userId}/>}

      {/* Pass userId safely to SetBudget */}
      {userId && <SetBudget userid={userId} />}

      <div className="filters" >
        <div className="filters1">
          <h6 style={{color:'white'}}> Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div className="filters2 ">
          <h6 style={{color:'white'}}>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="switch-icons" >
          <UnorderedListOutlined
            className={`mx-3 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-3 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          // <Table columns={columns} dataSource={allTransection} />
          <Table
  columns={columns}
  dataSource={allTransection}
  rowKey={(record) => record._id}  // or record.id or something unique
/>
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please input amount!' }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select type!' }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category!' }]}>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="transportation">Transportation</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select date!' }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
      
    </Layout>
  );
};

export default HomePage;
