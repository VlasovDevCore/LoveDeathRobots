import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default Layout;
