import { useQuery } from "@tanstack/react-query";
import { Spin, Table } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import userRole, { authAccess } from "../../utils/userRole";
import { useEffect, useState } from "react";


const initialColumns = [
  {
    title: "No.",
    render:(text, record, index)=>index+1
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

const getTopic = async () => {
  const { data } = await axios.get("/topics?");
  const topicData= data.data
  return topicData;
};

const TopicList = () => {
 const [columns, setColumns]= useState(initialColumns)
  const { token, isLogin, user } = useSelector((state) => state.auth);


  const { data, isError, error, isFetching} = useQuery({
    queryKey: "topic",
    queryFn: getTopic,
    // staleTime: 5000,
  });

  console.log(data);
  if (isError) {
    Swal.fire({
     icon: "error",
     title: "Oops...",
     text: error.response.data?.message|| "Error Happen"
   });
 }
  
  const actionColumn = [{title:"Action", render:(text, record)=> <>
  <div>edit</div>
  <div>delete</div>
  </>}]
useEffect(()=>{
  if(isLogin && authAccess(userRole.admin).includes(user?.role)){
    setColumns([...initialColumns, ...actionColumn])
   }
}, [user.role])

  return (
    <Spin spinning={isFetching}>
      <div className="container mx-auto">
      <div className="flex items-center my-4">
        <h1 className="  items-center ">Topic List</h1>
        <Link to="create" className="ms-auto mr-3 p-2 md:p-3 rounded  bg-primary text-accent hover:text-accent-hover">
          <button className=" font-semibold"> Create Topic </button>
        </Link>
      </div>
      <div>
        <Table dataSource={data} columns={columns} />;
      </div>
    </div>
    </Spin>
  );
};

export default TopicList;
