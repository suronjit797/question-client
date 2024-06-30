import DesktopNav from "./DesktopNav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/features/authSlice";
import { Button } from "antd";
import { IoMdLogOut } from "react-icons/io";
import MobileNav from "./MobileNav";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isLogin, user } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    dispatch(setAuth({ token: null, user: {} }));
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className=" bg-[#254336]  py-4 px-2 xl:py-5  md:py-5 capitalize">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-4xl font-semibold text-white">
            Logo <span className=" text-[#DAD3BE]">.</span>
          </h1>
        </Link>
        {/* Desktop nav */}
        <div className=" hidden md:flex items-center gap-8">
          <DesktopNav />
        </div>

        {/* auth section */}
        <div>
          <div className="hidden md:flex items-center ">
            {isLogin ? (
              <span className="mx-4 flex flex-col justify-start">
                <span className=" text-[12px] text-accent-hover">{user.role}</span>
                <div>
                  <IoMdLogOut onClick={handleLogout} className=" text-4xl font-semibold text-accent" />
                </div>
              </span>
            ) : (
              <>
                <Link to="/login"> login </Link>
                <Link to="/register"> register </Link>
              </>
            )}
          </div>
        </div>
        {/* mobile nav */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
