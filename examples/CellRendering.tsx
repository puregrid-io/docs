import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Grid, useColumns, CellComponents, useClientRows } from '@puregrid/core';

type Price = number;

interface Stock {
  name: string;
  symbol: string;
  closePrices: Price[];
}

const data: Stock[] = [
  {
    name: 'Tesla',
    symbol: 'TSLA',
    closePrices: [400.9, 397.22, 397.69, 400.15, 400.35, 384.82, 390.05],
  },
  {
    name: 'NIO',
    symbol: 'NIO',
    closePrices: [27.18, 27.52, 29.66, 31.99, 30.58, 33.32, 33.76],
  },
];

export function CellRendering() {
  const { columns, setColumns } = useColumns<Stock>([
    {
      key: 'name',
      header: 'Name',
      width: 120,
      getValue: stock => stock.name,
    },
    {
      key: 'symbol',
      header: 'Symbol',
      width: 120,
      getValue: stock => stock.symbol,
    },
    {
      key: 'close',
      header: 'Close (1w)',
      width: 200,
      getValue: stock => stock.closePrices,
      cellComponent: 'sparkline',
    },
  ]);

  const rows = useClientRows<Stock>({
    columns,
    data,
    getItemId: stock => stock.symbol,
  });

  const cellComponents: CellComponents = {
    sparkline: ({ column, row }) => (
      <Sparklines data={column.getValue(row.data)} width={100} height={20} margin={5}>
        <SparklinesLine color="blue" />
      </Sparklines>
    ),
  };

  return (
    <Grid<Stock>
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      cellComponents={cellComponents}
    />
  );
}
