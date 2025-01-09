import axiosInstance from '../utils/axiosInstance';

export const getUsers = async () => {
  try {
    console.log('getUsers service:');
    const response = await axiosInstance.get('/users');
    console.log('==================================================== getUsers service:');
    return response.data;
  }
  catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (user: any) => {
  const response = await axiosInstance.post('/users', user);
  return response.data;
};

export const updateUser = async (id: number, user: any) => {
  const response = await axiosInstance.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};