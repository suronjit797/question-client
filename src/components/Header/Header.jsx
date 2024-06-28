import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to="/"> home </Link>
      <Link to="/login"> login </Link>
      <Link to="/register"> register </Link>
    </>
  );
};

export default Header;
