import axiosInstance from '../utils/axiosInstance';
import { Tenant } from '../types/models';

export const getTenants = async (page: number, itemsPerPage: number): Promise<{ tenants: Tenant[], totalPages: number }> => {
  const offset = (page - 1) * itemsPerPage;
  const response = await axiosInstance.get(`/tenants?limit=${itemsPerPage}&offset=${offset}`);
  return response.data;
};

export const createTenant = async (tenant: Tenant): Promise<Tenant> => {
  const response = await axiosInstance.post('/tenants', tenant);
  return response.data;
};

export const updateTenant = async (id: number, tenant: Tenant): Promise<Tenant> => {
  const response = await axiosInstance.put(`/tenants/${id}`, tenant);
  return response.data;
};

export const deleteTenant = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/tenants/${id}`);
};