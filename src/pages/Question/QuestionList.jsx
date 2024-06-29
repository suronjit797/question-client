import { Button } from "antd";
import { Link } from "react-router-dom";

const QuestionList = () => {
  return (
    <div className="container mx-auto">
      <div className="flex my-4">
        <Link to="create" className="ms-auto">
          <Button type="primary"> Create Question </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionList;
