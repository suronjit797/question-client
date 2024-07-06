import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userRole, { authAccess } from "../../utils/userRole";
import { useState } from "react";
import { getAllQuestionFn } from "../../transtackQuery/questionApis";
import { useQuery } from "@tanstack/react-query";
import SideBar from "./component/SideBar";
import SearchForm from "./component/SearchForm";
import { Pagination } from "antd";

const QuestionList = () => {
  const { token, isLogin, user } = useSelector((state) => state.auth);
  const [params, setParams] = useState({});

  const {
    data: question,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["question", params],
    queryFn: () => getAllQuestionFn(params),
  });

  const data = question?.data || [];
  const meta = question?.meta || {};

  const handleTableChange = (page, limit) => {
    setParams((pre) => ({ ...pre, page, limit }));
  };

  return (
    <div className=" ">
      <div className="grid grid-cols-9 ">
        {/* side menu */}
        <div className=" col-span-2 ">
          <SideBar />
        </div>
        {/* question list */}
        <div className=" col-span-7 pt-2">
          <div className="flex justify-end ms-auto">
            {authAccess(userRole.admin).includes(user?.role) && (
              <Link to="create" className=" mr-3 p-2 md:p-3 rounded  bg-primary text-accent hover:text-accent-hover">
                <button className=" font-semibold"> Create Question </button>
              </Link>
            )}
          </div>
          <div className="border-b-2 border-primary">
            <SearchForm {...{ params, setParams }} />
          </div>
          <div>
            {Array.isArray(data)
              ? data?.map((item, index) => {
                  return (
                    <div key={index}>
                      <h1>{item._id}</h1>
                    </div>
                  );
                })
              : ""}
          </div>
          <Pagination
            current={meta.page || 1}
            pageSize={meta.limit || 10}
            onChange={handleTableChange}
            total={meta.total || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionList;

{
  /* {authAccess(userRole.admin).includes(user?.role) &&
  <Link to="create" className="ms-auto mr-3 p-2 md:p-3 rounded  bg-primary text-accent hover:text-accent-hover">
    <button className=" font-semibold"> Create Question </button>
  </Link>
} */
}
