import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import localStorageUtils, {
  KeyStorage,
} from "../../configs/localStore/localStorageUtils";

const menuItems = [
  {
    key: "dashboard",
    label: "Trang chủ",
    path: "/admin",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Z" />
      </svg>
    ),
  },
  {
    key: "accounts",
    label: "Quản lý tài khoản",
    path: "/admin/accounts",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22Z" />
      </svg>
    ),
  },
  {
    key: "category",
    label: "Quản lý danh mục",
    path: "/admin/category",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10,13H3a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM21,2H14a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2Z" />
      </svg>
    ),
  },

  {
    key: "products",
    label: "Quản lý sản phẩm",
    path: "/admin/products",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21 16V8a1 1 0 0 0-.55-.89l-8-4a1 1 0 0 0-.9 0l-8 4A1 1 0 0 0 3 8v8a1 1 0 0 0 .55.89l8 4a1 1 0 0 0 .9 0l8-4A1 1 0 0 0 21 16ZM12 4.26 18.47 8 12 11.74 5.53 8ZM5 9.87l6 3.47v6.8l-6-3ZM13 20.14v-6.8l6-3.47v6.8Z" />
      </svg>
    ),
  },
];

const SidebarContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorageUtils.get(KeyStorage.SELECTED_ADMIN_MENU_KEY);
    if (savedKey) {
      setActiveKey(savedKey);
    } else {
      const matchedItem = menuItems.find((item) =>
        location.pathname.startsWith(item.path)
      );
      if (matchedItem) {
        setActiveKey(matchedItem.key);
        localStorageUtils.set(
          KeyStorage.SELECTED_ADMIN_MENU_KEY,
          matchedItem.key
        );
      }
    }
  }, [location.pathname]);

  const handleClick = (item: (typeof menuItems)[0]) => {
    setActiveKey(item.key);
    localStorageUtils.set(KeyStorage.SELECTED_ADMIN_MENU_KEY, item.key);
    navigate(item.path);
  };

  return (
    <ul className="sidebar__nav">
      {menuItems.map((item) => (
        <li
          key={item.key}
          className={clsx(
            "sidebar__nav-item",
            activeKey === item.key && "sidebar__nav-link--active"
          )}
        >
          <a className="sidebar__nav-link" onClick={() => handleClick(item)}>
            <div className="cursor">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SidebarContent;
