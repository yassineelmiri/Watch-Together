import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from '../utils/axios';

// Define the type of input data for the mutation
interface CreateVideoData {
  name: string;
  file: File;
  userId: string;
}

// Define the type of the API response
interface ApiResponse {
  message: string;
  videoId: string; 
}

// Async function to handle video creation
const createVideo = async (data: CreateVideoData): Promise<ApiResponse> => {
  const formData = new FormData();
  
  formData.append('name', data.name);
  formData.append('file', data.file);
  formData.append('userId', data.userId);

  // Log FormData contents manually
  formData.forEach((value, key) => {
    console.log(key, value);
  });

  // Send the form data
  const response = await axios.post('http://localhost:4000/videos/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

// React Query hook with corrected types
export const useCreateVideo = (): UseMutationResult<
  ApiResponse, // Type of returned data
  Error,       // Type of error
  CreateVideoData // Type of input data
> => {
  return useMutation<ApiResponse, Error, CreateVideoData>({
    mutationFn: createVideo, // Pass the function as the mutation function
  });
};
