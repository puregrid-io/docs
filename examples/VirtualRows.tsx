import React from 'react';
import { Grid, useColumns, useClientRows, HeaderRenderers } from '@puregrid/core';

import olympicWinners from '../static/olympicWinnersSmall.json';
import { Winner, columnDefs, headerRenderers } from '../helpers/olympicWinnerHelpers';

export function VirtualRows() {
  const { columns, setColumns } = useColumns<Winner>(columnDefs);

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
