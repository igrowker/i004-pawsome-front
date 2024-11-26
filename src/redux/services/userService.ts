import apiClient from "../../apiClient";

export const fetchUserProfileFromAPI = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};
