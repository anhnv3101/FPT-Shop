import { Drawer } from "antd";
import React, { useState } from "react";
import SidebarContent from "./baseMenu";
import localStorageUtils, {
  KeyStorage,
} from "../../configs/localStore/localStorageUtils";

const NavbarAdmin = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // const auth = localStorageUtils.getObject<AuthData>(KeyStorage.AUTH, null);

  return (
    <>
      <header className="header">
        <div className="header__content">
          <button className="header__btn" onClick={showDrawer} type="button">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Drawer
            title="Menu"
            closable={{ "aria-label": "Close Button" }}
            onClose={onClose}
            open={open}
            className="sidebar__nav-item"
            bodyStyle={{ backgroundColor: "#131720", color: "#ffffff" }}
          >
            <div className="text-white">
              <SidebarContent />
            </div>
          </Drawer>
        </div>
      </header>

      {/* <!-- sidebar --> */}
      <div className="sidebar">
        {/* <!-- sidebar logo --> */}
        <a href="index.html" className="sidebar__logo">
          <img src="https://source.unsplash.com/random/300x200" alt="" />
        </a>
        {/* <!-- sidebar user --> */}
        <div className="sidebar__user">
          <div
            className="sidebar__user-img "
            style={{ border: "1px solid #fff" }}
          >
            <img src="https://source.unsplash.com/random/300x200" alt="" />
          </div>

          {/* <div className="sidebar__user-title">
            <span>{auth?.user.role}</span>
            <p>{auth?.user.name}</p>
          </div> */}

          <button className="sidebar__user-btn" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
            </svg>
          </button>
        </div>

        <SidebarContent />
      </div>
    </>
  );
};

export default NavbarAdmin;
