import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Spin, Table } from "antd";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userRole, { authAccess } from "../../utils/userRole";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteUserFn, getAllUserFn } from "../../transtackQuery/userApis";

const initialColumns = [
  {
    title: "No.",
    render: (text, record, index) => index + 1,
    align: "center",
    width: "100px",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const UserList = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState(initialColumns);
  const { isLogin, user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

 
  const {
    data: users,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["topic", page, limit],
    queryFn: () => getAllUserFn({ page, limit }),
  });

  const data = users?.data || [];
  const meta = users?.meta || {};
  const {
    mutate: deleteUser,
    // isError: deleteIsError,
    // error: deleteError,
    // isPending: isDeletePending,
    // isSuccess: isDeleteSuccess,
  } = useMutation({
    mutationKey: "deleteTopic",
    mutationFn: deleteUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
    navigate(`/user/edit/${record._id}`);
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
        deleteUser(record._id);
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
      align: "center",
      width: "150px",
    },
  ];
  useEffect(() => {
    if (isLogin && authAccess(userRole.admin).includes(user?.role)) {
      setColumns([...initialColumns, ...actionColumn]);
    }
  }, [user.role]);

  const handleTableChange = (current, size) => {
    setPage(current);
    setLimit(size);
    // console.log({ page, size });
    // setCurrent(pagination.current);
    // setPageSize(pagination.pageSize);
  };

  return (
    <div className="container  mt-28 mx-auto">
      <div className="flex items-center my-4">
        <h1 className="  items-center ">User List</h1>
        <Link to="create" className="ms-auto mr-3 p-2 md:p-3 rounded  bg-primary text-accent hover:text-accent-hover">
          <button className=" font-semibold"> Create User </button>
        </Link>
      </div>
      <Spin spinning={isFetching}>
        <div>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{
              current: page,
              pageSize: limit,
              total: meta?.total,
              onChange: handleTableChange,
            }}
          />
        </div>
      </Spin>
    </div>
  );
};

export default UserList;
