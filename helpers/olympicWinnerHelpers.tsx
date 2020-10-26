import React from 'react';
import { BiMedal } from 'react-icons/bi';
import { FaMedal } from 'react-icons/fa';
import { RiMedal2Line } from 'react-icons/ri';

import { ColumnAlign, HeaderRenderers } from '@puregrid/core';

export interface Winner {
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

export const columnDefs = [
  {
    key: 'country',
    header: 'Country',
    width: '1fr',
    minWidth: 120,
    getValue: winner => winner.country,
    group: true,
  },
  {
    key: 'year',
    header: 'Year',
    width: 120,
    getValue: winner => winner.year,
    group: true,
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
];

export const headerRenderers: HeaderRenderers<Winner> = {
  Gold: () => <FaMedal />,
  Silver: () => <BiMedal />,
  Bronze: () => <RiMedal2Line />,
};
