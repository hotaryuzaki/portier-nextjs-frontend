import axiosInstance from '../utils/axiosInstance';
import { User } from '../types/models';

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await axiosInstance.post('/users', user);
  return response.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  const response = await axiosInstance.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};