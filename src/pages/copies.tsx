import React, { useEffect, useState } from 'react';
import CopyTable from '../components/CopyTable';
import CopyForm from '../components/CopyForm';
import Pagination from '../components/Pagination';
import { getCopies, createCopy, updateCopy, deleteCopy } from '../services/copyService';
import { Copy } from '../types/models';

const CopiesPage = () => {
  const [title, setTitle] = useState('List');
  const [copies, setCopies] = useState<Copy[]>([]);
  const [editingCopy, setEditingCopy] = useState<Copy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchCopies(currentPage);
  }, [currentPage]);
    
  const fetchCopies = async (page: number) => {
    try {
      const data = await getCopies(page, itemsPerPage);
      setCopies(data.copies);
      setTotalPages(data.totalPages);      
    } catch (error) {
      console.error('Failed to fetch copies:', error);
    }
  };

  const handleCreateCopy = async (copy: Copy) => {
    await createCopy(copy);
    fetchCopies(currentPage);
  };

  const handleUpdateCopy = async (copy: Copy) => {
    await updateCopy(copy.id, copy);
    fetchCopies(currentPage);
  };

  const handleEditCopy = async (copy: Copy) => {
    console.log('Editing copy:', copy);
    setTitle('Edit');
    setEditingCopy(copy);
  };

  const handleSubmit = async (copy: Copy) => {
    if (editingCopy && editingCopy.id) {
      await handleUpdateCopy(copy);
    } else {
      await handleCreateCopy(copy);
    }
    setEditingCopy(null);
    setTitle('List');
  };

  const handleDeleteCopy = async (id: number) => {
    await deleteCopy(id);
    fetchCopies(currentPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Copies: {title}</h1>
      <CopyForm initialValues={editingCopy || {}} onSubmit={handleSubmit} />
      <CopyTable
        columns={[
          { Header: 'ID', accessor: 'id' },
          { Header: 'Name', accessor: 'name' },
        ]}
        data={copies}
        offset={(currentPage - 1) * itemsPerPage}
        onDelete={handleDeleteCopy}
        onEdit={handleEditCopy}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default CopiesPage;
