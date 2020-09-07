import React, { useState, useEffect } from 'react';
import EnhancedTable from './EnhancedTable';
import { getMills } from '../../../services/millService';

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Id'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Author'
  }
];

const MillTable = () => {
  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilter = filter => {
    setLoading(true);
    setFilters(filter);
  };

  useEffect(() => {
    getMills(filters).then(response => {
      setRows(response.data);
      setLoading(false);
    });
  }, [filters]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const mappedRows = rows.map(row => ({
    id: row.id,
    name: row.name,
    author: row.author.name
  }));
  return (
    <EnhancedTable
      orderBy="name"
      headCells={headCells}
      rows={mappedRows}
      title="Mills"
      handleFilter={handleFilter}
    />
  );
};

export default MillTable;
