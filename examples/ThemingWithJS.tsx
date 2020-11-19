import React from 'react';
import { Grid, useColumns, ColumnAlign, useClientRows } from '@puregrid/core';
import { Theme, umbraTheme } from '@puregrid/themes';

interface Person {
  uid: string;
  name: string;
  age: number;
}

const myCustomTheme: Theme = {
  ...umbraTheme,
  selectionBg: 'rgb(244, 188, 53)',
};

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

export function ThemingWithJS() {
  // A column setter is optional if you don't want resizing, sorting, or reordering.
  const { columns, setColumns } = useColumns<Person>([
    {
      // Column keys must be unique.
      key: 'name',
      // `header` can be any ReactNode.
      header: 'Name',
      // This is the value to render in a cell for this column.
      getValue: person => person.name,
      // Optional, defaults to 120px.
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

  // This example derives rows from data on the client. If you want serverside
  // filtering, sorting, and pagination then generate your rows from data on
  // your server - see the Serverside section for more details.
  const rows = useClientRows<Person>({
    columns,
    data,
    getItemId: person => person.uid,
  });

  // Note `themeId` is rarely needed (here because the styling docs has two different
  // grid themes on the same page).
  return (
    <Grid<Person>
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      theme={myCustomTheme}
      themeId="theme-with-js"
    />
  );
}
