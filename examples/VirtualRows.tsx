import React, { useState } from 'react';
import { BiMedal } from 'react-icons/bi';
import { FaMedal } from 'react-icons/fa';
import { RiMedal2Line } from 'react-icons/ri';
import {
  Grid,
  Columns,
  ColumnAlign,
  useClientRows,
  HeaderComponents,
} from '@puregrid/core';
import olympicWinners from './olympicWinnersSmall.json';

interface Winner {
  id: string;
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export function VirtualRows() {
  const [columns, setColumns] = useState<Columns<Winner>>([
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
      width: 120,
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
          width: 50,
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
    getRowSize: () => 40,
  });

  const headerComponents: HeaderComponents<Winner> = {
    Gold: () => <FaMedal />,
    Silver: () => <BiMedal />,
    Bronze: () => <RiMedal2Line />,
  };

  return (
    <Grid<Winner>
      style={{ height: 400 }}
      columns={columns}
      onColumnsChange={setColumns}
      headerComponents={headerComponents}
      rows={rows}
      virtualRows
    />
  );
}
