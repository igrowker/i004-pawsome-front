export const fetchFavoritesService = async (userId: string) => {
    const response = await fetch(`API_URL/favorites/${userId}`);
    if (!response.ok) {
      throw new Error("Error al obtener los favoritos");
    }
    const data = await response.json();
    return data;
  };
  