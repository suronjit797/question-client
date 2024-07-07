import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userRole, { authAccess } from "../../utils/userRole";
import { useState } from "react";
import { getAllQuestionFn } from "../../transtackQuery/questionApis";
import { useQuery } from "@tanstack/react-query";
import SideBar from "./component/SideBar";
import SearchForm from "./component/SearchForm";
import { Pagination } from "antd";
import PrintMath from "../../components/PrintMath/PrintMath";
import { FaChevronDown } from "react-icons/fa";

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
  console.log(data);
  const handleTableChange = (page, limit) => {
    setParams((pre) => ({ ...pre, page, limit }));
  };

  return (
    <div className=" mt-28">
      <div className="flex justify-start z-0 items-start ">
        {/* side menu */}
        <div className=" w-[20%] h-screen mt-0 fixed ">
          <SideBar />
        </div>
        {/* question list */}
        <div className=" w-[80%] ml-auto pt-2 overflow-y-scroll">
          <div className="flex justify-end ms-auto">
            {authAccess(userRole.admin).includes(user?.role) && (
              <Link to="create" className=" mr-3 p-2 md:p-3 rounded  bg-primary text-accent hover:text-accent-hover">
                <button className=" font-semibold"> Create Question </button>
              </Link>
            )}
          </div>
          <div className="border-b-2 border-opacity-35 border-primary">
            <SearchForm {...{ params, setParams }} />
          </div>
          <div>
            <div className="ml-5 font-semibold text-xl">Total <span className="text-green-500 text-xl">{data.length}</span> Question</div>
            {Array.isArray(data)
              ? data?.map((item, index) => {
                  return (
                    <div className="p-5 border-b-[12px] border-l-green-400" key={index}>
                      <h1 className="text-xl flex items-center gap-[6px] font-semibold">
                        {index + 1}.<PrintMath text={item?.question?.text} />
                      </h1>
                      <div className="ml-5 gap-3 mt-4">
                        <h2>A. {item.options.option1}</h2>
                        <h2>B. {item.options.option2}</h2>
                        <h2>C. {item.options.option3}</h2>
                        <h2>D. {item.options.option4}</h2>
                      </div>
                      <div className=" flex justify-between items-center">
                        {item.institutions.map((t, i) => (
                          <div className="ml-4 mt-8 " key={i}>
                            <h2 className="rounded text-sm py-1 px-2 bg-red-200 font-semibold text-red-600">
                              {t.name} '{t.year}
                            </h2>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start">
                        <h1 className=" w-auto px-2 py-1 text-xl font-semibold text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white">Show Answer & Solution <span ><FaChevronDown/></span></h1>
                      </div>
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
