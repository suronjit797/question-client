import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Spin, Table } from "antd";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userRole, { authAccess } from "../../utils/userRole";
import { useEffect, useState } from "react";
import { deleteTopicFn, getAllTopicFn } from "../../transtackQuery/topicApis";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const initialColumns = [
  {
    title: "No.",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Topic",
    dataIndex: "topic",
    key: "topic",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Paper",
    dataIndex: "paper",
    key: "paper",
  },
  {
    title: "Chapter",
    dataIndex: "chapter",
    key: "chapter",
  },
];

const TopicList = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState(initialColumns);
  const { isLogin, user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["topic"],
    queryFn: getAllTopicFn,
    // staleTime: 5000,
  });
  const {
    mutate: deleteTopic,
    // isError: deleteIsError,
    // error: deleteError,
    // isPending: isDeletePending,
    // isSuccess: isDeleteSuccess,
  } = useMutation({
    mutationKey: "deleteTopic",
    mutationFn: deleteTopicFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topic"] });
    },
  });

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data?.message || "Error Happen",
    });
  }

  const editHandler = (record) => {
    console.log(record);
    navigate(`/topic/edit/${record._id}`);
  };

  const deleteHandler = (record) => {
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
        deleteTopic(record._id);
      }
    });

    // deleteTopic(record._id);
  };

  const actionColumn = [
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Button primary type="primary" onClick={() => editHandler(record)}>
            <EditOutlined />
          </Button>
          <Button className="ml-2" type="primary" danger onClick={() => deleteHandler(record)}>
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ];
  useEffect(() => {
    if (isLogin && authAccess(userRole.admin).includes(user?.role)) {
      setColumns([...initialColumns, ...actionColumn]);
    }
  }, [user.role]);

  return (
    <div className="container mx-auto">
      <div className="flex items-center my-4">
        <h1 className="  items-center ">Topic List</h1>
        <Link to="create" className="ms-auto mr-3 p-2 md:p-3 rounded  bg-primary text-accent hover:text-accent-hover">
          <button className=" font-semibold"> Create Topic </button>
        </Link>
      </div>
      <Spin spinning={isFetching}>
        <div>
          <Table dataSource={data} columns={columns} />
        </div>
      </Spin>
    </div>
  );
};

export default TopicList;
