import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const DesktopNav = ({ routs = [] }) => {
  return (
    <div>
      <div className="flex gap-5  text-white font-semibold">
        <div className="me-3 flex gap-5">
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
      </div>
    </div>
  );
};
DesktopNav.propTypes = {
  routs: PropTypes.array.isRequired,
};

export default DesktopNav;
