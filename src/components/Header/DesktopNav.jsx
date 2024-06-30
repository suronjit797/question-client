import { NavLink } from "react-router-dom";

const DesktopNav = () => {
  return (
    <div>
      <div className="flex gap-5  text-white font-semibold">
        <div className="me-3">
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? " text-accent border-b-2 border-accent capitalize"
                : "  capitalize font-medium hover:text-accent transition-all";
            }}
            to="/"
          >
            {" "}
            home{" "}
          </NavLink>
        </div>
        <div className="me-3">
          <NavLink
            className={({ isActive }) => {
              return isActive
                ? " text-accent border-b-2 border-accent capitalize"
                : "  capitalize font-medium hover:text-accent transition-all";
            }}
            to="/question"
          >
            {" "}
            question{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
