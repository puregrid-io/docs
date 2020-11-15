import React from 'react';
import { GrLocation } from 'react-icons/gr';
import {
  Grid,
  useColumns,
  useClientRows,
  HeaderComponents,
  HeaderProps,
} from '@puregrid/core';

interface Person {
  uid: string;
  name: string;
  location: string;
}

const data: Person[] = [
  {
    uid: 'Hi7R7goh7',
    name: 'Roger Finehorn',
    location: 'Bahamas',
  },
  {
    uid: 'Ig6Rfgf548',
    name: 'Janet Laurie',
    location: 'Paris',
  },
  {
    uid: 'UYr65euiG79',
    name: 'Dolores Panama',
    location: 'Panama',
  },
];

function BoldUnderline({ column }: HeaderProps<Person>) {
  return <strong style={{ textDecoration: 'underline' }}>{column.header}</strong>;
}

export function HeaderRendering() {
  const { columns, setColumns } = useColumns<Person>([
    {
      key: 'name',
      header: 'Name',
      getValue: person => person.name,
      width: 180,
    },
    {
      key: 'location',
      header: 'Location',
      getValue: person => person.location,
      width: 120,
    },
  ]);

  const rows = useClientRows<Person>({
    columns,
    data,
    getItemId: person => person.uid,
  });

  const headerComponents: HeaderComponents<Person> = {
    Name: BoldUnderline,
    Location: () => <GrLocation />,
  };

  return (
    <Grid<Person>
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      headerComponents={headerComponents}
    />
  );
}
