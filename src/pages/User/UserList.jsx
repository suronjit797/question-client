import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Spin, Table } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import userRole, { authAccess } from "../../utils/userRole";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteUserFn, getAllUserFn } from "../../transtackQuery/userApis";
import EditModal from "./EditModal";


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

  const [columns, setColumns] = useState(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState();

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
    queryKey: ["user", page, limit],
    queryFn: () => getAllUserFn({ page, limit }),
  });

  const data = users?.data || [];
  const meta = users?.meta || {};

  const {
    mutate: deleteUser,
  } = useMutation({
    mutationKey: "deleteUser",
    mutationFn: deleteUserFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // const {
  //   mutate: updateUser,
  // } = useMutation({
  //   mutationKey: "updateUser",
  //   mutationFn: updateUserFn,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["user"] });
  //   },
  // });

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data?.message || "Error happened",
    });
  }

  const editHandler = (record) => {
    setEditData(record);
    setIsModalOpen(true);
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
  };

  // const saveHandler = (values) => {
  //   const updatedData = { ...editData, ...values };
  //   updateUser(updatedData);
  // };

  const actionColumn = [
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => editHandler(record)}>
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.role]);

  const handleTableChange = (current, size) => {
    setPage(current);
    setLimit(size);
  };

  return (
    <div className="container mt-28 mx-auto">
      <div className="flex items-center my-4">
        <h1 className="items-center">User List</h1>
        <Link to="create" className="ms-auto mr-3 p-2 md:p-3 rounded bg-primary text-accent hover:text-accent-hover">
          <button className="font-semibold">Create User</button>
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
      {isModalOpen && (
        <EditModal
          isModalOpen={isModalOpen}
          editData={editData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default UserList;
