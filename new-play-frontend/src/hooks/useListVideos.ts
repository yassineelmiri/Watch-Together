import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios'; // Assurez-vous que axios est correctement configuré avec une base URL si nécessaire.

const fetchVideos = async () => {
  try {
    const { data } = await axios.get('/videos/list'); // Supposons que `axios` a une baseURL déjà définie.
    return data.videos; // Remplacez `videos` par la clé réelle de votre API, si différente.
  } catch (error: any) {
    console.error('Error fetching videos:', error.response?.data || error);
    throw new Error('Failed to fetch videos');
  }
};

export const useListVideos = () => {
  return useQuery({
    queryKey: ['videos'], // Clé de la requête
    queryFn: fetchVideos, // Fonction de récupération
    staleTime: 60000
  });
};
