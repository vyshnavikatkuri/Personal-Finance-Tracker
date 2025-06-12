import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBell, FaTimes } from "react-icons/fa";
import "./NotificationList.css";

const NotificationList = ({ userid }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/v1/notifications/${userid}`);
        const fetched = res.data;
        if (Array.isArray(fetched)) {
          setNotifications(fetched);
          if (fetched.length > 0) {
            toast.info(fetched[fetched.length - 1].message);
          }
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error("Error fetching notifications", err);
        toast.error("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    if (userid) fetchNotifications();
  }, [userid]);

  return (
    <div className="floating-notification-container">
      <div className="notification-toggle" onClick={() => setOpen(!open)}>
        <FaBell size={20} /> Notifications
        {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
      </div>

      {open && (
        <div className="notification-panel">
          <div className="panel-header">
            <span>Notifications</span>
            <FaTimes className="close-icon" onClick={() => setOpen(false)} />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="no-msg">No notifications</p>
          ) : (
            <ul className="notification-list">
              {notifications.map((n) => (
                <li className="notification-item" key={n._id || n.id}>
                   {n.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
