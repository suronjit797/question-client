import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const { data } = await axios.get("/users");
  return data;
};

const Home = () => {
  const { isError, data, error, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  console.log({ isError, data, error, isFetching });
  return (
    <div className="mt-28 ">
     
      <h1 className="text-3xl font-bold underline">Home!</h1>{" "}
      {/* <QuestionForm/> */}
    </div>
  );
};

export default Home;
