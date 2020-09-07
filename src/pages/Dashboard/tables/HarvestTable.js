import React, { useState, useEffect } from 'react';
import moment from 'moment';
import EnhancedTable from './EnhancedTable';
import { getHarvests } from '../../../services/harvestService';

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
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    label: 'Start Date'
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: false,
    label: 'End Date'
  },
  {
    id: 'ownerMill',
    numeric: false,
    disablePadding: false,
    label: 'Mill'
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Author'
  }
];

const HarvestTable = () => {
  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilter = filter => {
    setLoading(true);
    setFilters(filter);
  };

  useEffect(() => {
    getHarvests(filters).then(response => {
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
    startDate: moment(row.start_date).format('MM-DD-YYYY'),
    endDate: moment(row.end_date).format('MM-DD-YYYY'),
    ownerMill: row.ownerMill.name,
    author: row.author.name
  }));
  return (
    <EnhancedTable
      orderBy="name"
      headCells={headCells}
      rows={mappedRows}
      title="Harvests"
      handleFilter={handleFilter}
    />
  );
};

export default HarvestTable;
