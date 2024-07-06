import { useQuery } from "@tanstack/react-query";
import { getAllQuestion } from "../../../../transtackQuery/topicApis";

const AllQuestion = () => {
    const { data, isError, error, isFetching } = useQuery({
        queryKey: ["q"],
        queryFn: getAllQuestion,
      });
    
      if (Array.isArray(data)){
        console.log(data)
      }

    return (
        <div>
            {Array.isArray(data)?
            data?.map((item, index) => {
              return (
                <div key={index}>
                  <h1>{item.id}</h1>
                </div>
              );
            }):""}
        </div>
    );
};

export default AllQuestion;