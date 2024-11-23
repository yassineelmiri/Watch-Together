import { useMutation } from '@tanstack/react-query';
import axios from '../utils/axios';

interface CreateRoomData {
  title: string;
  numberOfPlaces: number;
  Videos: string[];
  Users: string[];
}


const createRoom = async (newRoom: CreateRoomData) => {
  try {
    const response = await axios.post('http://localhost:4000/room', newRoom);
    return response.data;
  } catch (error: any) {
    console.error("Error details:", error.response?.data);
    console.error("Full error:", error);
    throw error;
  }
};


const useCreateRoom = () => {
  return useMutation({
    mutationFn: createRoom,
  });
};

export default useCreateRoom;
