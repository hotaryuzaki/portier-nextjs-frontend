import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import Pagination from '../components/Pagination';
import { getUsers, createUser, updateUser, deleteUser, searchUsers } from '../services/userService';
import { User } from '../types/models';

const UsersPage = () => {
  const [title, setTitle] = useState('List');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [idNumberFilter, setIdNumberFilter] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page: number) => {
    try {
      const data = await getUsers(page, itemsPerPage);
      setUsers(data.users);
      setFilteredUsers(data.users);
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

  const handleEditUser = async (user: User) => {
    console.log('Editing user:', user);
    setTitle('Edit');
    setEditingUser(user);
    setIsFormVisible(true);
  };

  const handleSubmit = async (user: User, { resetForm }: any) => {
    if (editingUser && editingUser.id) {
      await handleUpdateUser(user);
    } else {
      await handleCreateUser(user);
    }
    setEditingUser(null);
    setTitle('List');
    setIsFormVisible(false);
    resetForm();
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    fetchUsers(currentPage);
  };

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleIdNumberFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdNumberFilter(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const data = await searchUsers(nameFilter, idNumberFilter, currentPage, itemsPerPage);
      setFilteredUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to search users:', error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users: {title}</h1>

      {isFormVisible && (
        <UserForm initialValues={editingUser || {}} onSubmit={handleSubmit} />
      )}

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={handleNameFilterChange}
          className="text-black p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Filter by ID number"
          value={idNumberFilter}
          onChange={handleIdNumberFilterChange}
          className="text-black p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
        <button
          onClick={toggleFormVisibility}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {isFormVisible ? 'Hide Form' : 'Add'}
        </button>
      </div>

      <UserTable
        columns={[
          { Header: 'ID', accessor: 'id' },
          { Header: 'Username', accessor: 'username' },
          { Header: 'Email', accessor: 'email' },
          { Header: 'Name', accessor: 'name' },
          { Header: 'ID Number', accessor: 'id_number' },
        ]}
        data={filteredUsers}
        offset={(currentPage - 1) * itemsPerPage}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
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