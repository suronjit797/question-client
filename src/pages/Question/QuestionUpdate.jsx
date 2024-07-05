import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleQuestionFn } from "../../transtackQuery/questionApis";
import Swal from "sweetalert2";
import { Spin } from "antd";
import QuestionForm from "./QuestionForm";

const QuestionUpdate = () => {
  const { id } = useParams();

  // transtack query
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["question", id],
    queryFn: () => getSingleQuestionFn(id),
  });

  // others
  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data?.message || "Error Happen",
    });
  }

  return (
    <Spin spinning={isFetching}>
      <QuestionForm mode="edit" data={data} />
    </Spin>
  );
};

export default QuestionUpdate;
