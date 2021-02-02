import React, { useContext } from "react";
import Notification from "../UI/Notification";
import { NotificationContext } from "../../context/Notification";

const NotificationList: React.FC = () => {
  const { items, removeNotification } = useContext<iNotificationContext>(
    NotificationContext
  );

  return items.length > 0 ? (
    <div className="fixed z-auto space-y-4 flex flex-col bottom-4 left-4 right-4 sm:right-4 sm:left-auto">
      {items.map((item) => (
        <Notification
          className="mx-auto"
          key={item.id}
          title={item.title}
          message={item.message}
          closeable={item.closeable}
          type={item.type}
          onClose={() => {
            item.closeable && removeNotification(item.id);
          }}
        />
      ))}
    </div>
  ) : null;
};

export default NotificationList;
