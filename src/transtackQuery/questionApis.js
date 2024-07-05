import axios from "axios";

export const createQuestionFn = (body) => {
  return axios.post("/questions", body);
};

export const getAllQuestionFn = async () => {
  const { data } = await axios.get("/questions");
  return data.data;
};

export const getSingleQuestionFn = async (id) => {
  const { data } = await axios.get("/questions/" + id);
  return data.data;
};

export const updateQuestionFn = ({ id, body }) => {
  return axios.put("/questions/" + id, body);
};

export const deleteQuestionFn = (id) => {
  return axios.delete("/questions/" + id);
};
