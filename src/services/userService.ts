import axiosInstance from '../utils/axiosInstance';
import { User } from '../types/models';

export const getUsers = async (page: number, itemsPerPage: number): Promise<{ users: User[], totalPages: number }> => {
  const offset = (page - 1) * itemsPerPage;
  const response = await axiosInstance.get(`/users?limit=${itemsPerPage}&offset=${offset}`);
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

export const searchUsers = async (name: string, idNumber: string, page: number, itemsPerPage: number): Promise<{ users: User[], totalPages: number }> => {
  const offset = (page - 1) * itemsPerPage;
  const response = await axiosInstance.get(`/users?limit=${itemsPerPage}&offset=${offset}&name=${name}&idnumber=${idNumber}`);
  return response.data;
};