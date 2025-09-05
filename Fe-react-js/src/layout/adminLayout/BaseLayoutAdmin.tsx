import { Outlet } from "react-router-dom";

import NavbarAdmin from "./NavbarAdmin";
import "../../css/admin/admin.style.css";


const BaseLayoutAdmin = () => {


  return (
    <>
      <NavbarAdmin />
      <main className="main">
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default BaseLayoutAdmin;
