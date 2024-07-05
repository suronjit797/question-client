import axios from "axios";

export const createTopicFn = (body) => {
    // console.log({ body });
    return axios.post("/topics", body);
};

export const getAllTopicFn = async () => {
    const { data } = await axios.get("/topics");
    const topicData = data.data;
    return topicData;
  };

export const getSingleTopicFn = async (id) => {
    const { data } = await axios.get("/topics/" + id);
    const topicData = data.data;
    return topicData;
  };
   
export const updateTopicFn = ({ id, body }) => {
    return axios.put("/topics/" + id, body);
};
  
export const deleteTopicFn = ( id ) => {
    return axios.delete("/topics/" + id);
};