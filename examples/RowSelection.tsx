import React, { useState } from 'react';
import {
  Grid,
  useColumns,
  ColumnAlign,
  useClientRows,
  HeaderRenderers,
  CellRenderers,
  useRowState,
} from '@puregrid/core';

interface Person {
  uid: string;
  name: string;
  age: number;
}

const data: Person[] = [
  {
    uid: 'yF5gjtTt557',
    name: 'Laurie Pope',
    age: 21,
  },
  {
    uid: 'Hi7R7goh7',
    name: 'Roger Finehorn',
    age: 62,
  },
  {
    uid: 'Ig6Rfgf548',
    name: 'Janet Laurie',
    age: 37,
  },
  {
    uid: 'UYr65euiG79',
    name: 'Dolores Panama',
    age: 27,
  },
];

export function RowSelection() {
  const [allSelected, setAllSelected] = useState(false);
  const { getRowState, setRowState } = useRowState();

  const { columns, setColumns } = useColumns<Person>([
    {
      key: 'select',
      header: 'Select All',
      getValue: person => getRowState(person.uid).selected,
      cellRenderer: 'selectRow',
      width: 40,
      pinned: true,
    },
    {
      key: 'name',
      header: 'Name',
      getValue: person => person.name,
      width: 180,
    },
    {
      key: 'age',
      header: 'Age',
      getValue: person => person.age,
      align: ColumnAlign.End,
      width: 80,
    },
  ]);

  const rows = useClientRows<Person>({
    columns,
    data,
    getItemId: person => person.uid,
    rowState: getRowState(),
  });

  const headerRenderers: HeaderRenderers<Person> = {
    'Select All': () => (
      <input
        type="checkbox"
        checked={allSelected}
        onChange={e => {
          // Prevent default stops the column from doing a sort.
          e.stopPropagation();
          setAllSelected(e.currentTarget.checked);
        }}
      />
    ),
  };

  const cellRenderers: CellRenderers<Person> = {
    selectRow: ({ row }) => (
      <input
        type="checkbox"
        checked={allSelected || getRowState(row.key).selected}
        onChange={e => setRowState(row.key, { selected: e.currentTarget.checked })}
        // Or the function version of setting state will work just as well:
        // onChange={e => setRowState(row.key, s => ({ ...s, selected: !s.selected }))}
      />
    ),
  };

  return (
    <Grid<Person>
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      headerRenderers={headerRenderers}
      cellRenderers={cellRenderers}
    />
  );
}
