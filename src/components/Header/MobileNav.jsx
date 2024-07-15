import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/features/authSlice";
import { IoMdLogOut } from "react-icons/io";
import PropTypes from "prop-types";
// import { AnimatePresence, motion } from "framer-motion";

const MobileNav = ({ routs = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(setAuth({ token: null, user: {} }));
    localStorage.clear();
    navigate("/login");
  };

  const [isActiv, setIsActiv] = useState(false);
  const navMenue = () => {
    setIsActiv(!isActiv);
  };
  return (
    <nav className=" flex gap-8  ">
      <div className={`${isActiv ? " block  w-full h-screen absolute right-0 top-0 " : " hidden"}`}>
        <div className=" grid grid-flow-col grid-col-6 ">
          <div onClick={navMenue} className=" col-span-2 bg-transparent z-50   "></div>
          <div className=" col-span-4 flex flex-col z-50 bg-black bg-opacity-80 h-screen">
            <div className=" flex justify-between items-center p-5">
              {/* logo */}
              <Link to="/">
                {/* <h2 className=" text-xl font-semibold">
                  Azaz<span className=" text-accent">.</span>
                </h2> */}
              </Link>

              <RxCross2 onClick={navMenue} className=" text-[25px]  text-accent" />
            </div>
            <Link className=" text-center mt-2 mb-5" to="/">
              <h2 className=" text-4xl mt-4 text-white mb-10 font-semibold">
                Logo<span className=" text-accent">.</span>
              </h2>
            </Link>

            {/* menu */}
            <div className=" overflow-y-scroll text-white h-full">
              <div className=" ">
                <div className="flex flex-col gap-4 justify-center items-center me-3 text-xl">
                  {routs.map((item, index) => {
                    return (
                      <NavLink
                        key={index}
                        className={({ isActive }) => {
                          return isActive
                            ? " text-accent border-b-2 border-accent capitalize"
                            : "  capitalize font-medium hover:text-accent transition-all";
                        }}
                        to={item.path}
                      >
                        {item.name}
                      </NavLink>
                    );
                  })}
                </div>
                {/* <div className="me-3 text-xl">
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? " text-accent border-b-2 border-accent capitalize"
                        : "  capitalize font-medium hover:text-accent transition-all";
                    }}
                    to="/topic"
                  >
                    {" "}
                    topic{" "}
                  </NavLink>
                </div> */}
              </div>
            </div>

            {/* Auth */}

            <div className=" p-3 w-full bg-primary rounded-s ">
              {isLogin ? (
                <span className=" flex justify-between items-center">
                  <span className=" text-[12px] text-accent">{user.role}</span>
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
        </div>
      </div>

      <CiMenuFries onClick={navMenue} className=" text-[32px] text-accent" />
    </nav>
  );
};
MobileNav.propTypes = {
  routs: PropTypes.array.isRequired,
};

export default MobileNav;
