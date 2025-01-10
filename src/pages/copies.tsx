import React, { useEffect, useState } from 'react';
import CopyTable from '../components/CopyTable';
import CopyForm from '../components/CopyForm';
import Pagination from '../components/Pagination';
import { getCopies, createCopy, updateCopy, deleteCopy } from '../services/copyService';
import { Copy } from '../types/models';

const CopiesPage = () => {
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

  const handleDeleteCopy = async (id: number) => {
    await deleteCopy(id);
    fetchCopies(currentPage);
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
        offset={(currentPage - 1) * itemsPerPage}
        onDelete={handleDeleteCopy}
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
