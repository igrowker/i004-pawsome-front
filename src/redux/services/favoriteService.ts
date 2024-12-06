import apiClient from '../../apiClient';

export const fetchFavoritesService = async (userId: string) => {
  try {
    const response = await apiClient.get(`/favorites/${userId}`);
    return response.data; 
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Error fetching favorites';
    throw new Error(errorMessage);
  }
};
