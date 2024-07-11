import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userRole, { authAccess } from "../../utils/userRole";
import { useState } from "react";
import { deleteQuestionFn, getAllQuestionFn } from "../../transtackQuery/questionApis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SideBar from "./component/SideBar";
import SearchForm from "./component/SearchForm";
import { Pagination, Spin, Tooltip } from "antd";
import PrintMath from "../../components/PrintMath/PrintMath";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import { GiArrowScope } from "react-icons/gi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { CiFilter } from "react-icons/ci";

const optionNumber = {
  option1: "a",
  option2: "b",
  option3: "c",
  option4: "d",
};

const QuestionList = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [params, setParams] = useState({});
  const [solution, setSolution] = useState(false);
  const [filter, setFilter] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: question,
    isError,
    // error,
    isFetching,
  } = useQuery({
    queryKey: ["question", params],
    queryFn: () => getAllQuestionFn(params),
    keepPreviousData: true,
  });
  const data = question?.data || [];
  const meta = question?.meta || {};
  console.log(data);

  const {
    mutate: deleteQuestion,
    // isError: deleteIsError,
    // error: deleteError,
    // isPending: isDeletePending,
    // isSuccess: isDeleteSuccess,
  } = useMutation({
    mutationKey: "deleteTopic",
    mutationFn: deleteQuestionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", params] });
    },
  });

  const handleTableChange = (page, limit) => {
    setParams((pre) => ({ ...pre, page, limit }));
  };
  const filterHandler = () => {
    setFilter(!filter);
  };
  console.log(data);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuestion(id);
      }
    });
  };

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      // text: topicError.response.data?.message || updateError.response.data?.message || "Error Happen",
      text: "Error Happen",
    });
  }

  return (
    <div className=" mt-28">
      <div className="flex justify-start items-start ">
        {/* side menu */}
        <div className=" w-[20%] h-auto border-2 hidden   mt-0 fixed ">
          <SideBar />
        </div>
        {/* question list */}
        <div className=" w-[80%] mx-auto  pt-2 l">
          <div className="flex justify-between items-center mb-3 ms-auto">
            {filter ? (
              <Tooltip title="filter">
                <FaFilter onClick={filterHandler} className="select-none cursor-pointer text-2xl text-green-700 ml-3" />
              </Tooltip>
            ) : (
              <Tooltip title="filter">
                <CiFilter onClick={filterHandler} className="select-none cursor-pointer text-4xl text-green-700 ml-3" />
              </Tooltip>
            )}

            {authAccess(userRole.admin).includes(user?.role) && (
              <Link to="create" className=" mr-3 p-1 md:p-2  rounded  bg-primary text-accent hover:text-accent-hover">
                <button className=" font-semibold"> Create Question </button>
              </Link>
            )}
          </div>
          <div className={filter ? " block border-opacity-35 border-primary" : "hidden"}>
            <SearchForm {...{ params, setParams }} />
          </div>
          <div className="bg-gray-100 pt-4">
            <div className="ml-5 font-semibold text-xl">
              Total <span className="text-green-500 text-xl">{meta.total}</span> Question
            </div>
            <Spin spinning={isFetching}>
              {Array.isArray(data)
                ? data?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="p-5 pb-24 bg-white rounded shadow m-4 relative border-l-green-400">
                          {authAccess(userRole.admin).includes(user?.role) && (
                            <div className="absolute top-3 right-3 flex gap-3">
                              <div
                                className="text-green-500 cursor-pointer"
                                onClick={() => navigate(`edit/${item._id}`)}
                              >
                                <EditOutlined />
                              </div>
                              <div onClick={() => deleteHandler(item._id)} className="text-red-500 cursor-pointer">
                                <DeleteOutlined />
                              </div>
                            </div>
                          )}
                          <div className="ml-9">
                            <h1 className="text-xl flex items-baseline gap-[6px] font-semibold">
                              <span className="mr-3">{(meta.page - 1) * meta.limit + (index + 1)}.</span>
                              <PrintMath text={item?.question?.text} />
                            </h1>
                            <div className="flex items-center gap-2 mt-3 w-auto h-auto">
                              {item?.question?.images?.map((t, i) => {
                                return (
                                  <div key={i} className="w-1/5 ml-5">
                                    <img src={t.thumbUrl} alt="Solution Photo" />
                                  </div>
                                );
                              })}
                            </div>
                            {item.type === "mcq" ? (
                              <div className=" ml-10 gap-2 mt-4">
                                {/* <h1>{optionNumber[item.answerIndex]}</h1> */}
                                {/* <img src={item.options.option1.thumbUrl} alt="" /> */}

                                {typeof item.options?.option1 === "string" ? (
                                  <div className="flex flex-col gap-2">
                                    <h2 className=" flex items-center gap-2">
                                      <span>a)</span>
                                      <span>
                                        <PrintMath text={item.options?.option1} />
                                      </span>
                                    </h2>
                                    <h2 className=" flex items-center gap-2">
                                      <span>b)</span>
                                      <span>
                                        <PrintMath text={item.options?.option2} />
                                      </span>
                                    </h2>
                                    <h2 className=" flex items-center gap-2">
                                      <span>c)</span>
                                      <span>
                                        <PrintMath text={item.options?.option3} />
                                      </span>
                                    </h2>
                                    <h2 className=" flex items-center gap-2">
                                      <span>d)</span>
                                      <span>
                                        <PrintMath text={item.options?.option4} />
                                      </span>
                                    </h2>
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-2 gap-6 p-4">
                                    <h2 className=" flex items-start gap-2">
                                      <span>a)</span>
                                      <span className="p-5 pt-0">
                                        <img
                                          className=" md:max-w-52"
                                          src={item?.options.option1?.thumbUrl}
                                          alt={item?.options.option1?.uid}
                                        />
                                      </span>
                                    </h2>
                                    <h2 className=" flex items-start gap-2">
                                      <span>b)</span>
                                      <span className="p-5 pt-0">
                                        <img
                                          className=" md:max-w-52"
                                          src={item?.options.option2?.thumbUrl}
                                          alt={item.options.option2?.uid}
                                        />
                                      </span>
                                    </h2>
                                    <h2 className=" flex items-start gap-2">
                                      <span>c)</span>
                                      <span className="p-5 pt-0">
                                        <img
                                          className=" md:max-w-52"
                                          src={item?.options.option3?.thumbUrl}
                                          alt={item?.options.option3?.uid}
                                        />
                                      </span>
                                    </h2>
                                    <h2 className=" flex items-start gap-2">
                                      <span>d)</span>
                                      <span className="p-5 pt-0">
                                        <img
                                          className=" md:max-w-52"
                                          src={item?.options.option4?.thumbUrl}
                                          alt={item?.options.option4?.uid}
                                        />
                                      </span>
                                    </h2>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <></>
                            )}
                            <div className=" flex justify-end items-center">
                              {item.institutions.map((t, i) => (
                                <div className="ml-4 mt-8 " key={i}>
                                  <h2 className="rounded text-sm py-1 px-2 bg-red-200 font-semibold text-red-600">
                                    {t.name} &#39;{t.year}
                                  </h2>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-start mt-8">
                              <div
                                onClick={() => (solution ? setSolution(null) : setSolution(item._id))}
                                className="flex justify-between items-center  w-auto px-2 py-1 text-xl font-semibold text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white"
                              >
                                {" "}
                                <h1>Show Answer & Solution</h1>{" "}
                                <h1 className=" ml-6">
                                  <FaChevronDown />
                                </h1>
                              </div>
                            </div>
                            {/* solution */}

                            <div className={solution === item._id ? " block py-4 px-6 border-2 mt-4 mb-6" : "hidden"}>
                              <div className=" flex items-center">
                                <GiArrowScope className=" text-2xl font-bold mr-[10px]" />
                                <h1 className=" flex items-center gap-3">
                                  <span className="text-xl font-semibold">Answer:</span>{" "}
                                  {item.type === "mcq" ? (
                                    <span className=" ml-1">
                                      {typeof item.options?.option1 === "string" ? (
                                        <span className="flex items-center gap-2">
                                          {optionNumber[item?.answerIndex]}.{" "}
                                          <PrintMath text={item?.options && item?.options[item?.answerIndex]} />
                                        </span>
                                      ) : (
                                        <span className="flex items-start gap-2 mt-1 ml-6">
                                          <span>{optionNumber[item?.answerIndex]}.</span>
                                          <img
                                            className=" max-w-48"
                                            src={item?.options?.[item?.answerIndex]?.thumbUrl}
                                            alt=""
                                          />
                                        </span>
                                      )}

                                      {/* {optionNumber[item?.answerIndex]}. {item?.options && item?.options[item?.answerIndex]} */}
                                    </span>
                                  ) : (
                                    <span className=" ml-1">{item?.answerText}</span>
                                  )}
                                </h1>
                              </div>
                              <div className=" flex items-center">
                                <GiArrowScope className=" text-2xl font-bold mr-[10px]" />
                                <h1 className="text-xl font-semibold">Solution:</h1>
                              </div>
                              <div className="mt-2 mb-6 text-justify">
                                <PrintMath text={item?.solution.text} />
                                <div className="flex items-center gap-2 mt-2 w-auto h-auto">
                                  {item?.question?.images?.map((t, i) => {
                                    return (
                                      <div key={i} className="w-1/5 ">
                                        <img src={t?.thumbUrl} alt="Solution Photo" />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </Spin>
          </div>
          <div className="flex justify-end items-center mt-8 mb-28 mx-11">
            <Pagination
              current={meta.page || 1}
              pageSize={meta.limit || 10}
              onChange={handleTableChange}
              total={meta.total || 0}
            />
          </div>
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
