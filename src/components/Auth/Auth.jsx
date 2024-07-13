import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


const Auth = ({ children, roles = [] }) => {
  const { isLogin, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    if (isLogin && Array.isArray(roles) && roles.length) {
      const hasAccess = [...roles, "superAdmin"];
      if (!hasAccess.includes(user?.role)) {
        navigate(-1);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles, isLogin]);

  return <>{children}</>;
};
Auth.propTypes = {
  children: PropTypes.array,
  roles: PropTypes.array,
};

export default Auth;
