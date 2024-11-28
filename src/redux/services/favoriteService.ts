export const fetchFavoritesService = async (userId: string) => {
  try {
    const response = await fetch(`https://api.example.com/favorites/${userId}`);
    if (!response.ok) {
      throw new Error('Error fetching favorites');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Error fetching favorites');
    }
    throw new Error('Error fetching favorites');
  }
};
