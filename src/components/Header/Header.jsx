import DesktopNav from "./DesktopNav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/features/authSlice";
import { IoMdLogOut } from "react-icons/io";
import MobileNav from "./MobileNav";
import userRole, { authAccess } from "../../utils/userRole";
import { useEffect, useState } from "react";

const generalRouts = [
  { name: "Home", path: "/" },
  { name: "Question", path: "/question" },
];
const adminRouts = [
  { name: "Topic", path: "/topic" },
  { name: "User", path: "/user" },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);
  const [routs, setRouts] = useState(generalRouts);
  useEffect(() => {
    if (authAccess(userRole.admin).includes(user?.role)) {
      setRouts([...generalRouts, ...adminRouts]);
    }
  }, [user?.role]);

  // handle logout
  const handleLogout = () => {
    dispatch(setAuth({ token: null, user: {} }));
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className=" bg-[#254336]  py-4 px-2 xl:py-5  md:py-5 capitalize fixed z-50 w-screen">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-4xl font-semibold text-white">
            Logo <span className=" text-[#DAD3BE]">.</span>
          </h1>
        </Link>
        {/* Desktop nav */}
        <div className=" hidden md:flex items-center gap-8">
          <DesktopNav routs={routs} />
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
          <MobileNav routs={routs} />
        </div>
      </div>
    </header>
  );
};

export default Header;
