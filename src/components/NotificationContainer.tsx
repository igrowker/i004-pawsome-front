import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import { removeNotification } from "../redux/notificationSlice";

interface RootState {
  notifications: {
    notifications: Array<{
      id: string;
      type: "success" | "error";
      message: string;
    }>;
  };
}

const NotificationContainer: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  const handleClose = (id: string) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={handleClose}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
