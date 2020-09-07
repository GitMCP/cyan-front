import React, { useState, useEffect } from 'react';
import EnhancedTable from './EnhancedTable';
import { getFields } from '../../../services/fieldService';

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
    id: 'location',
    numeric: false,
    disablePadding: false,
    label: 'Coordinates'
  },
  {
    id: 'ownerFarm',
    numeric: false,
    disablePadding: false,
    label: 'Farm'
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Author'
  }
];

const FieldTable = () => {
  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilter = filter => {
    setLoading(true);
    setFilters(filter);
  };

  useEffect(() => {
    getFields(filters).then(response => {
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
    location: row.location.coordinates.join(' ; '),
    ownerFarm: row.ownerFarm.name,
    author: row.author.name
  }));
  return (
    <EnhancedTable
      orderBy="name"
      headCells={headCells}
      rows={mappedRows}
      title="Fields"
      handleFilter={handleFilter}
    />
  );
};

export default FieldTable;
