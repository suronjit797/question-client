import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TopicForm from "./UserForm";
import { getSingleTopicFn } from "../../transtackQuery/topicApis";
import { Spin } from "antd";
import Swal from "sweetalert2";

const UserUpdate = () => {
  const { id } = useParams();

  // transtack query
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["topic", id],
    queryFn: () => getSingleTopicFn(id),
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
      <TopicForm mode="edit" id={id} data={data} />
    </Spin>
  );
};

export default UserUpdate;
