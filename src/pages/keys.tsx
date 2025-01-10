import React, { useEffect, useState } from 'react';
import KeyTable from '../components/KeyTable';
import KeyForm from '../components/KeyForm';
import Pagination from '../components/Pagination';
import { getKeys, createKey, updateKey, deleteKey } from '../services/keyService';
import { Key } from '../types/models';

const KeysPage = () => {
  const [title, setTitle] = useState('List');
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

  const handleEditKey = async (key: Key) => {
    console.log('Editing key:', key);
    setTitle('Edit');
    setEditingKey(key);
  };

  const handleSubmit = async (key: Key) => {
    if (editingKey && editingKey.id) {
      await handleUpdateKey(key);
    } else {
      await handleCreateKey(key);
    }
    setEditingKey(null);
    setTitle('List');
  };

  const handleDeleteKey = async (id: number) => {
    await deleteKey(id);
    fetchKeys(currentPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Keys: {title}</h1>
      <KeyForm initialValues={editingKey || {}} onSubmit={handleSubmit} />
      <KeyTable
        columns={[
          { Header: 'ID', accessor: 'id' },
          { Header: 'Name', accessor: 'name' },
        ]}
        data={keys}
        offset={(currentPage - 1) * itemsPerPage}
        onDelete={handleDeleteKey}
        onEdit={handleEditKey}
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
