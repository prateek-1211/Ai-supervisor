import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const askAI = (question) => 
  axios.post(`${API_URL}/ask`, { question });

export const getRequests = () => 
  axios.get(`${API_URL}/requests`);

export const resolveRequest = (id, question, answer) =>
  axios.post(`${API_URL}/resolve`, { id, question, answer });

export const getKnowledge = () => 
  axios.get(`${API_URL}/knowledge`);

export const deleteRequest = async (id) => {
  return await axios.delete(`${API_URL}/requests/${id}`);
};
