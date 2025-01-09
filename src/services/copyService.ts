import axiosInstance from '../utils/axiosInstance';
import { Copy } from '../types/models';

export const getCopies = async (): Promise<Copy[]> => {
  const response = await axiosInstance.get('/copies');
  return response.data;
};

export const createCopy = async (copy: Copy): Promise<Copy> => {
  const response = await axiosInstance.post('/copies', copy);
  return response.data;
};

export const updateCopy = async (id: number, copy: Copy): Promise<Copy> => {
  const response = await axiosInstance.put(`/copies/${id}`, copy);
  return response.data;
};

export const deleteCopy = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/copies/${id}`);
};