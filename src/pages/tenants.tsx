import React, { useEffect, useState } from 'react';
import TenantTable from '../components/TenantTable';
import TenantForm from '../components/TenantForm';
import Pagination from '../components/Pagination';
import { getTenants, createTenant, updateTenant, deleteTenant } from '../services/tenantService';
import { Tenant } from '../types/models';

const TenantsPage = () => {
  const [title, setTitle] = useState('List');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchTenants(currentPage);
  }, [currentPage]);
  
  const fetchTenants = async (page: number) => {
    try {
      const data = await getTenants(page, itemsPerPage);
      setTenants(data.tenants);
      setTotalPages(data.totalPages);      
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
    }
  };

  const handleCreateTenant = async (tenant: Tenant) => {
    await createTenant(tenant);
    fetchTenants(currentPage);
  };

  const handleUpdateTenant = async (tenant: Tenant) => {
    await updateTenant(tenant.id, tenant);
    fetchTenants(currentPage);
  };

  const handleEditTenant = async (tenant: Tenant) => {
    console.log('Editing tenant:', tenant);
    setTitle('Edit');
    setEditingTenant(tenant);
  };

  const handleSubmit = async (tenant: Tenant) => {
    if (editingTenant && editingTenant.id) {
      await handleUpdateTenant(tenant);
    } else {
      await handleCreateTenant(tenant);
    }
    setEditingTenant(null);
    setTitle('List');
  };

  const handleDeleteTenant = async (id: number) => {
    await deleteTenant(id);
    fetchTenants(currentPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tenants: {title}</h1>
      <TenantForm initialValues={editingTenant || {}} onSubmit={handleSubmit} />
      <TenantTable
        columns={[
          { Header: 'ID', accessor: 'id' },
          { Header: 'Name', accessor: 'name' },
          { Header: 'Address', accessor: 'address' },
          { Header: 'Status', accessor: 'status' },
          { Header: 'Active', accessor: 'is_active' },
        ]}
        data={tenants}
        offset={(currentPage - 1) * itemsPerPage}
        onDelete={handleDeleteTenant}
        onEdit={handleEditTenant}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default TenantsPage;