import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleCreateUser = async (user: any) => {
    await createUser(user);
    fetchUsers();
  };

  const handleUpdateUser = async (user: any) => {
    await updateUser(user.id, user);
    fetchUsers();
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UserForm initialValues={{}} onSubmit={handleCreateUser} />
      <UserTable
        columns={[
          { Header: 'ID', accessor: 'id' },
          { Header: 'Username', accessor: 'username' },
          { Header: 'Email', accessor: 'email' },
          { Header: 'Name', accessor: 'name' },
          { Header: 'Actions', accessor: 'actions' },
        ]}
        data={users}
      />
    </div>
  );
};

export default UsersPage;
