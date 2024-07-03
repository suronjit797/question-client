import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userRole, { authAccess } from "../../utils/userRole";

const QuestionList = () => {
  const { token, isLogin, user } = useSelector((state) => state.auth);
  return (
    <div className="container mx-auto">
      <div className="flex items-center my-4">
        <h1 className="  items-center ">Question List</h1>
        {authAccess(userRole.admin).includes(user?.role) &&
          <Link to="create" className="ms-auto mr-3 p-2 md:p-3 rounded  bg-primary text-accent hover:text-accent-hover">
            <button className=" font-semibold"> Create Question </button>
          </Link>
        }
      </div>
    </div>
  );
};

export default QuestionList;
