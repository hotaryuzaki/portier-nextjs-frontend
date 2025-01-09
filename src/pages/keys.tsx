import React, { useEffect, useState } from 'react';
import KeyTable from '../components/KeyTable';
import KeyForm from '../components/KeyForm';
import Pagination from '../components/Pagination';
import { getKeys, createKey, updateKey, deleteKey } from '../services/keyService';
import { Key } from '../types/models';

const KeysPage = () => {
  const [keys, setKeys] = useState<Key[]>([]);
  const [editingKey, setEditingKey] = useState<Key | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchKeys(currentPage);
  }, [currentPage]);

  const fetchKeys = async (page: number) => {
    try {
      const data = await getKeys(page, itemsPerPage);
      setKeys(data.keys);
      setTotalPages(data.totalPages);      
    } catch (error) {
      console.error('Failed to fetch keys:', error);
    }
  };

  const handleCreateKey = async (key: Key) => {
    await createKey(key);
    fetchKeys(currentPage);
  };

  const handleUpdateKey = async (key: Key) => {
    await updateKey(key.id, key);
    fetchKeys(currentPage);
  };

  const handleDeleteKey = async (id: number) => {
    await deleteKey(id);
    fetchKeys(currentPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Keys</h1>
      <KeyForm initialValues={{}} onSubmit={handleCreateKey} />
      <KeyTable
        columns={[
          { Header: 'ID', accessor: 'id' },
          { Header: 'Name', accessor: 'name' },
          { Header: 'Actions', accessor: 'actions' },
        ]}
        data={keys}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default KeysPage;
