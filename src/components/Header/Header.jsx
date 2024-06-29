import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/features/authSlice";

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
    <div className=" bg-blue-300 py-3 capitalize">
      <div className="container flex items-center  mx-auto">
        <div className="me-3">
          <Link to="/"> home </Link>
        </div>
        <div className="me-3">
          <Link to="/question"> question </Link>
        </div>
        <div className="ms-auto">
          {isLogin ? (
            <span className="mx-4">
              <span className="mx-4">{user.role}</span>
              <Button type="primary" danger onClick={handleLogout}>
                Logout
              </Button>
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
  );
};

export default Header;
