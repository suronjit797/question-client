import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="body">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
