import { Link } from "react-router-dom";

const QuestionList = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center my-4">
        <h1 className="  items-center ">Question List</h1>
        <Link to="create" className="ms-auto mr-3 p-2 md:p-3 rounded  bg-primary text-accent hover:text-accent-hover">
          <button className=" font-semibold"> Create Question </button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionList;
