import React, { useEffect, useState } from 'react';
import CopyTable from '../components/CopyTable';
import CopyForm from '../components/CopyForm';
import { getCopies, createCopy, updateCopy, deleteCopy } from '../services/copyService';
import { Copy } from '../types/models';

const CopiesPage = () => {
  const [copies, setCopies] = useState<Copy[]>([]);
  const [editingCopy, setEditingCopy] = useState<Copy | null>(null);

  useEffect(() => {
    fetchCopies();
  }, []);

  const fetchCopies = async () => {
    const data = await getCopies();
    setCopies(data);
  };

  const handleCreateCopy = async (copy: Copy) => {
    await createCopy(copy);
    fetchCopies();
  };

  const handleUpdateCopy = async (copy: Copy) => {
    await updateCopy(copy.id, copy);
    fetchCopies();
  };

  const handleDeleteCopy = async (id: number) => {
    await deleteCopy(id);
    fetchCopies();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Copies</h1>
      <CopyForm initialValues={{}} onSubmit={handleCreateCopy} />
      <CopyTable
        columns={[
          { Header: 'ID', accessor: 'id' },
          { Header: 'Name', accessor: 'name' },
          { Header: 'Actions', accessor: 'actions' },
        ]}
        data={copies}
      />
    </div>
  );
};

export default CopiesPage;
