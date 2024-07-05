import axios from "axios";

export const createTopicFn = (body) => {
    // console.log({ body });
    return axios.post("/users", body);
};

export const getAllTopicFn = async () => {
    const { data } = await axios.get("/users");
    return data?.data||[]
  //   const topicData = data.data;
  //   return topicData;
  };

export const getSingleTopicFn = async (id) => {
    const { data } = await axios.get("/users/" + id);
    return data?.data||{}
  };
   
export const updateTopicFn = ({ id, body }) => {
    return axios.put("/users/" + id, body);
};
  
export const deleteTopicFn = ( id ) => {
    return axios.delete("/users/" + id);
};