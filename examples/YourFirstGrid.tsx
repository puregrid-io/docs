import React, { useState } from 'react';
import { Grid, Columns, ColumnAlign, useClientRows } from '@puregrid/core';

interface Person {
  uid: string;
  name: string;
  age: number;
}

const data: Person[] = [
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

export function YourFirstGrid() {
  // A column setter is optional if you don't want resizing, sorting, or reordering.
  const [columns, setColumns] = useState<Columns<Person>>([
    {
      // Column keys must be unique.
      key: 'name',
      // `header` can be any ReactNode.
      header: 'Name',
      // This is the value to render in a cell for this column.
      getValue: (person) => person.name,
      // Optional, defaults to 120px.
      width: 180,
    },
    {
      key: 'age',
      header: 'Age',
      getValue: (person) => person.age,
      align: ColumnAlign.End,
      width: 80,
    },
  ]);

  // This example derives rows from data on the client. If you want serverside
  // filtering, sorting, and pagination then generate your rows from data on
  // your server - see the Serverside section for more details.
  const rows = useClientRows<Person>({
    columns,
    data,
    getItemId: person => person.uid,
  });

  return (
    <Grid<Person> columns={columns} onColumnsChange={setColumns} rows={rows} />
  );
}