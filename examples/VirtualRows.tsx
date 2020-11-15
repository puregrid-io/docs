import React from 'react';
import { Grid, useColumns, useClientRows, ColumnAlign } from '@puregrid/core';

import olympicWinners from '../static/olympicWinnersSmall.json';
import { Winner, headerRenderers } from '../src/utils/olympicWinnerHelpers';

export function VirtualRows() {
  const { columns, setColumns } = useColumns<Winner>([
    {
      key: 'country',
      header: 'Country',
      width: '1fr',
      minWidth: 120,
      getValue: winner => winner.country,
    },
    {
      key: 'year',
      header: 'Year',
      width: 100,
      getValue: winner => winner.year,
    },
    {
      key: 'date',
      header: 'Date',
      width: 100,
      getValue: winner => winner.date,
    },
    {
      key: 'athlete',
      header: 'Athlete',
      width: '1fr',
      minWidth: 120,
      getValue: winner => winner.athlete,
    },
    {
      key: 'sport',
      header: 'Sport',
      width: 100,
      getValue: winner => winner.sport,
    },
    {
      key: 'medals',
      header: 'Medals',
      children: [
        {
          key: 'gold',
          header: 'Gold',
          width: 50,
          getValue: winner => winner.gold,
          align: ColumnAlign.End,
        },
        {
          key: 'silver',
          header: 'Silver',
          width: 50,
          getValue: winner => winner.silver,
          align: ColumnAlign.End,
        },
        {
          key: 'bronze',
          header: 'Bronze',
          width: 50,
          getValue: winner => winner.bronze,
          align: ColumnAlign.End,
        },
        {
          key: 'total',
          header: 'Total',
          width: 70,
          getValue: winner => winner.total,
          align: ColumnAlign.End,
        },
      ],
    },
  ]);

  const rows = useClientRows<Winner>({
    columns,
    data: olympicWinners,
    getItemId: winner => winner.id,
  });

  return (
    <Grid<Winner>
      style={{ height: 400 }}
      columns={columns}
      onColumnsChange={setColumns}
      headerRenderers={headerRenderers}
      rows={rows}
      getRowSize={() => 40}
      virtualRows
    />
  );
}
