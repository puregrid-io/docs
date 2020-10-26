import React from 'react';
import {
  Grid,
  useColumns,
  CellRenderers,
  ColumnAlign,
  useClientRows,
} from '@puregrid/core';

interface ImportantData {
  id: number;
  veryWideThing: string;
  killSwitch: boolean;
}

const data: ImportantData[] = [
  {
    id: 1,
    veryWideThing: 'This has no business being this wide',
    killSwitch: true,
  },
  {
    id: 2,
    veryWideThing: 'This has no business being this wide',
    killSwitch: true,
  },
  {
    id: 3,
    veryWideThing: 'This has no business being this wide',
    killSwitch: false,
  },
  {
    id: 4,
    veryWideThing: 'This has no business being this wide',
    killSwitch: true,
  },
];

export function ColumnPinning() {
  const { columns, setColumns } = useColumns<ImportantData>([
    {
      key: 'id',
      header: 'ID',
      width: 60,
      getValue: d => d.id,
      pinned: true,
    },
    {
      key: 'veryWideThing',
      header: 'Very Wide Thing',
      width: 1200,
      getValue: d => d.veryWideThing,
    },
    {
      key: 'killSwitch',
      header: 'Kill it',
      width: 64,
      getValue: d => d.killSwitch,
      cellRenderer: 'checkbox',
      align: ColumnAlign.Center,
      pinned: true,
    },
    {
      key: 'anotherVeryWideThing',
      header: 'Another Very Wide Thing',
      width: 800,
      getValue: d => d.veryWideThing,
      align: ColumnAlign.End,
    },
  ]);

  const rows = useClientRows<ImportantData>({
    columns,
    data,
    getItemId: d => d.id,
  });

  const cellRenderers: CellRenderers = {
    checkbox: ({ column, row }) => (
      <input type="checkbox" readOnly value={column.getValue(row.data)} />
    ),
  };

  return (
    <Grid<ImportantData>
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      cellRenderers={cellRenderers}
    />
  );
}
