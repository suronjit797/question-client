import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import QuestionForm from "../Question/QuestionForm";

const fetchUsers = async () => {
  const { data } = await axios.get("/users");
  return data;
};

const Home = ({}) => {
  const { isError, data, error, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  console.log({ isError, data, error, isFetching });
  return (
    <>
      {" "}
      <h1 className="text-3xl font-bold underline">Home!</h1>{" "}
      {/* <QuestionForm/> */}
    </>
  );
};

export default Home;
