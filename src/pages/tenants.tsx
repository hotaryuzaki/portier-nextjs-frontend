import React, { useEffect, useState } from 'react';
import TenantTable from '../components/TenantTable';
import TenantForm from '../components/TenantForm';
import { getTenants, createTenant, updateTenant, deleteTenant } from '../services/tenantService';
import { Tenant } from '../types/models';

const TenantsPage = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    const data = await getTenants();
    setTenants(data);
  };

  const handleCreateTenant = async (tenant: Tenant) => {
    await createTenant(tenant);
    fetchTenants();
  };

  const handleUpdateTenant = async (tenant: Tenant) => {
    await updateTenant(tenant.id, tenant);
    fetchTenants();
  };

  const handleDeleteTenant = async (id: number) => {
    await deleteTenant(id);
    fetchTenants();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tenants</h1>
      <TenantForm initialValues={{}} onSubmit={handleCreateTenant} />
      <TenantTable
        columns={[
          { Header: 'ID', accessor: 'id' },
          { Header: 'Name', accessor: 'name' },
          { Header: 'Address', accessor: 'address' },
          { Header: 'Status', accessor: 'status' },
          { Header: 'Active', accessor: 'isActive' },
          { Header: 'Actions', accessor: 'actions' },
        ]}
        data={tenants}
      />
    </div>
  );
};

export default TenantsPage;