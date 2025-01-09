import axiosInstance from '../utils/axiosInstance';
import { Key } from '../types/models';

export const getKeys = async (): Promise<Key[]> => {
  const response = await axiosInstance.get('/keys');
  return response.data;
};

export const createKey = async (key: Key): Promise<Key> => {
  const response = await axiosInstance.post('/keys', key);
  return response.data;
};

export const updateKey = async (id: number, key: Key): Promise<Key> => {
  const response = await axiosInstance.put(`/keys/${id}`, key);
  return response.data;
};

export const deleteKey = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/keys/${id}`);
};