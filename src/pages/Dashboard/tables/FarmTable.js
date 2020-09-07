import React, { useState, useEffect } from 'react';
import EnhancedTable from './EnhancedTable';
import { getFarms } from '../../../services/farmService';

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Id'
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Code'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'ownerHarvest',
    numeric: false,
    disablePadding: false,
    label: 'Harvest'
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Author'
  }
];

const FarmTable = () => {
  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilter = filter => {
    setLoading(true);
    setFilters(filter);
  };

  useEffect(() => {
    getFarms(filters).then(response => {
      setRows(response.data);
      setLoading(false);
    });
  }, [filters]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const mappedRows = rows.map(row => ({
    id: row.id,
    code: row.code,
    name: row.name,
    ownerHarvest: row.ownerHarvest.code,
    author: row.author.name
  }));
  return (
    <EnhancedTable
      orderBy="name"
      headCells={headCells}
      rows={mappedRows}
      title="Farms"
      handleFilter={handleFilter}
    />
  );
};

export default FarmTable;
