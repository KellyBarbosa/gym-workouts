import api from "../services/api";

export const loadData = async (endpoint: string) => {
  const response = await api.get(`/${endpoint}`);
  return response.data;
};

