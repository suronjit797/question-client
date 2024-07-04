import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import TopicForm from "./TopicForm";

const getTopic = async (id) => {
    
    const { data } = await axios.get("/topics/"+id);
    const topicData = data.data;
    return topicData;

  };

const TopicUpdate = () => {
    const {id}=useParams()

    const { data, isError, error, isFetching } = useQuery({
        queryKey: ["topic", id],
        queryFn: ()=>getTopic(id),
      });
console.log(data)
    return (
        <div>
            <TopicForm mode="edit" data={data} />
            
        </div>
    );
};

export default TopicUpdate;