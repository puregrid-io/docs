import React from 'react';
import { Grid, useColumns, ColumnAlign, useClientRows } from '@puregrid/core';

interface Person {
  name: string;
  gender: string;
  age: number;
}

const data: Person[] = [
  {
    name: 'Young George',
    gender: 'Male',
    age: 2,
  },
  {
    name: 'Bobby Riccard',
    gender: 'Male',
    age: 14,
  },
  {
    name: 'Michelle Twatberry',
    gender: 'Female',
    age: 36,
  },
  {
    name: 'Grumpy Roger',
    gender: 'Unknown',
    age: 117,
  },
];

export function ColumnAlignment() {
  const { columns, setColumns } = useColumns<Person>([
    {
      key: 'name',
      header: 'Name',
      width: 160,
      getValue: person => person.name,
    },
    {
      key: 'gender',
      header: 'Gender',
      width: 100,
      getValue: person => person.gender,
    },
    {
      key: 'age',
      header: 'Age',
      width: 80,
      getValue: person => person.age,
      align: ColumnAlign.End,
    },
  ]);

  const rows = useClientRows<Person>({
    columns,
    data,
    getItemId: person => person.name,
  });

  return <Grid<Person> columns={columns} onColumnsChange={setColumns} rows={rows} />;
}
