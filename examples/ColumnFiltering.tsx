import React, { useState } from 'react';
import {
  Grid,
  useColumns,
  DerivedColumn,
  CellRenderers,
  FilterRenderers,
  ColumnAlign,
  useClientRows,
  useFilterState,
} from '@puregrid/core';

interface Candidate {
  name: string;
  age: number;
  resident: boolean;
}

const data: Candidate[] = [
  {
    name: 'Richard Glutton',
    age: 52,
    resident: false,
  },
  {
    name: 'Bombay Saffron',
    age: 35,
    resident: true,
  },
  {
    name: 'Jimmy Sochuse',
    age: 40,
    resident: true,
  },
  {
    name: 'Sally Peterson',
    age: 24,
    resident: false,
  },
  {
    name: 'Moon Unit',
    age: 27,
    resident: false,
  },
  {
    name: 'James Palawan',
    age: 17,
    resident: true,
  },
  {
    name: 'Smith Sam',
    age: 8,
    resident: false,
  },
  {
    name: 'Jennifer McGuire',
    age: 15,
    resident: true,
  },
];

function booleanFilter<T>(column: DerivedColumn<T>, item: T, filterValue: string) {
  const value = column.getValue(item) as boolean;
  return !filterValue || value === Boolean(Number(filterValue));
}

export function ColumnFiltering() {
  const { columns, setColumns } = useColumns<Candidate>([
    {
      key: 'name',
      header: 'Name',
      width: 140,
      getValue: c => c.name,
      filterRenderer: 'string',
      filter: 'partialStringMatch',
    },
    {
      key: 'age',
      header: 'Age',
      width: 140,
      getValue: c => c.age,
      filterRenderer: 'number',
      filter: 'exactMatch',
      align: ColumnAlign.End,
    },
    {
      key: 'resident',
      header: 'Resident',
      width: 100,
      getValue: c => c.resident,
      cellRenderer: 'boolean',
      filterRenderer: 'boolean',
      filter: 'booleanFilter',
      align: ColumnAlign.End,
    },
  ]);

  const [globalFilter, setGlobalFilter] = useState('');
  const { setFilterState, getFilterState } = useFilterState();

  const rows = useClientRows<Candidate>({
    columns,
    data,
    getItemId: c => c.name,
    globalFilter,
    filterState: getFilterState(),
    filterMethods: { booleanFilter },
  });

  const filterRenderers: FilterRenderers<Candidate> = {
    string: ({ column }) => (
      <input
        value={getFilterState(column.key)}
        placeholder="Filter"
        onChange={e => setFilterState(column.key, e.target.value)}
      />
    ),
    number: ({ column }) => (
      <input
        type="number"
        min="0"
        value={String(getFilterState(column.key))}
        onChange={e => setFilterState(column.key, Number(e.target.value))}
      />
    ),
    boolean: ({ column }) => (
      <select
        value={getFilterState(column.key)}
        onChange={e => setFilterState(column.key, e.target.value)}
      >
        <option value="">All</option>
        <option value="1">True</option>
        <option value="0">False</option>
      </select>
    ),
  };

  const cellRenderers: CellRenderers<Candidate> = {
    default: ({ column, row }) => column.getValue(row.data),
    boolean: ({ column, row }) => (
      <input type="checkbox" readOnly checked={column.getValue(row.data)} />
    ),
  };

  return (
    <>
      <p>
        <input
          type="search"
          value={globalFilter}
          placeholder="Search the grid"
          onChange={e => setGlobalFilter(e.currentTarget.value)}
        />
      </p>
      <Grid<Candidate>
        columns={columns}
        onColumnsChange={setColumns}
        rows={rows}
        cellRenderers={cellRenderers}
        filterRenderers={filterRenderers}
      />
    </>
  );
}
