import React, { useState, createContext } from "react";

const NotificationContext = createContext<iNotificationContext>({
  items: [],
  addNotification: (
    itemProps: iNotificationProps,
    activeTime: number = -1
  ): number => itemProps && activeTime && -1,
  removeNotification: (id: number) => id,
});

const NotificationProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<iNotificationItem[]>([]);

  const removeNotification = (id: number): void => {
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  const addNotification = (
    itemProps: iNotificationProps,
    activeTime: number = -1
  ): number => {
    const id = new Date().getTime() + Math.random();
    const item: iNotificationItem = {
      ...itemProps,
      id,
    };

    setNotifications((prevNotifications) => [...prevNotifications, item]);

    if (!!~activeTime) {
      if (activeTime < 100) {
        activeTime = 500;
      }

      setTimeout(removeNotification, activeTime, id);
    }

    return id;
  };

  return (
    <NotificationContext.Provider
      value={{
        items: notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
