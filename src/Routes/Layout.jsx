import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => (
  <div className="dark:bg-slate-900">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

export default Layout;
