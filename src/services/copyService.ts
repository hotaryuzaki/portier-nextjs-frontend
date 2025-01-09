import axiosInstance from '../utils/axiosInstance';

export const getCopies = async () => {
  const response = await axiosInstance.get('/copies');
  return response.data;
};

export const createCopy = async (copy: any) => {
  const response = await axiosInstance.post('/copies', copy);
  return response.data;
};

export const updateCopy = async (id: number, copy: any) => {
  const response = await axiosInstance.put(`/copies/${id}`, copy);
  return response.data;
};

export const deleteCopy = async (id: number) => {
  const response = await axiosInstance.delete(`/copies/${id}`);
  return response.data;
};