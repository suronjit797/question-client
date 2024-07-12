import axios from "axios";

export const createTopicFn = (body) => {
    // console.log({ body });
    return axios.post("/users", body);
};

export const getAllUserFn = async () => {
    const { data } = await axios.get("/users");
    return data 
    // return data?.data||[]
  //   const topicData = data.data;
  //   return topicData;
  };

export const getSingleUserFn = async (id) => {
    const { data } = await axios.get("/users/" + id);
    return data?.data||{}
  };
   
export const updateUserFn = ({ id, body }) => {
    return axios.put("/users/" + id, body);
};
  
export const deleteUserFn = ( id ) => {
    return axios.delete("/users/" + id);
};