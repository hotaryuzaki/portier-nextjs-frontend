import React, { useEffect, useState } from 'react';
import KeyTable from '../components/KeyTable';
import KeyForm from '../components/KeyForm';
import { getKeys, createKey, updateKey, deleteKey } from '../services/keyService';
import { Key } from '../types/models';

const KeysPage = () => {
  const [keys, setKeys] = useState<Key[]>([]);
  const [editingKey, setEditingKey] = useState<Key | null>(null);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    const data = await getKeys();
    setKeys(data);
  };

  const handleCreateKey = async (key: Key) => {
    await createKey(key);
    fetchKeys();
  };

  const handleUpdateKey = async (key: Key) => {
    await updateKey(key.id, key);
    fetchKeys();
  };

  const handleDeleteKey = async (id: number) => {
    await deleteKey(id);
    fetchKeys();
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
    </div>
  );
};

export default KeysPage;
