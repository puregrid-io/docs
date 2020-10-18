import React, { useState } from 'react';
import {
  Grid,
  Columns,
  CellComponents,
  ColumnAlign,
  useClientRows,
  SortDirection,
} from '@puregrid/core';

interface Animal {
  species: string;
  name: string;
  age: number;
}

const data: Animal[] = [
  {
    species: 'Aardvark',
    name: 'Young George',
    age: 2,
  },
  {
    species: 'Elephant',
    name: 'Bobby Riccard',
    age: 14,
  },
  {
    species: 'Aardvark',
    name: 'Grumpy Roger',
    age: 17,
  },
];

export function ColumnSorting() {
  const [columns, setColumns] = useState<Columns<Animal>>([
    {
      key: 'species',
      header: 'Species',
      width: 100,
      getValue: animal => animal.species,
      sortDirection: SortDirection.Desc,
    },
    {
      key: 'name',
      header: 'Name',
      width: 120,
      getValue: animal => animal.name,
    },
    {
      key: 'age',
      header: 'Age',
      width: 80,
      getValue: animal => animal.age,
      align: ColumnAlign.End,
    },
  ]);

  const rows = useClientRows<Animal>({
    columns,
    data,
    getItemId: animal => animal.name,
  });

  return <Grid<Animal> columns={columns} onColumnsChange={setColumns} rows={rows} />;
}
