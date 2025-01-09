import axiosInstance from '../utils/axiosInstance';

export const getKeys = async () => {
  const response = await axiosInstance.get('/keys');
  return response.data;
};

export const createKey = async (key: any) => {
  const response = await axiosInstance.post('/keys', key);
  return response.data;
};

export const updateKey = async (id: number, key: any) => {
  const response = await axiosInstance.put(`/keys/${id}`, key);
  return response.data;
};

export const deleteKey = async (id: number) => {
  const response = await axiosInstance.delete(`/keys/${id}`);
  return response.data;
};