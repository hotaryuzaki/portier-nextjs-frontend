import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import Pagination from '../components/Pagination';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';
import { User } from '../types/models';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    try {
      const data = await getUsers(page, itemsPerPage);
      setUsers(data.users);
      setTotalPages(data.totalPages);      
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleCreateUser = async (user: User) => {
    await createUser(user);
    fetchUsers(currentPage);
  };

  const handleUpdateUser = async (user: User) => {
    await updateUser(user.id, user);
    fetchUsers(currentPage);
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    fetchUsers(currentPage);
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
        offset={(currentPage - 1) * itemsPerPage}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default UsersPage;
