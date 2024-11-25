import apiClient from "../../apiClient";

export const fetchAnimalFromAPI = async (id: string) => {
  const response = await apiClient.get(`/animals/${id}`);
  return response.data;
};