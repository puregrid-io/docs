import React, { useRef, useState } from 'react';
import { Grid, useColumns, ColumnAlign, useClientRows } from '@puregrid/core';
import { generatePeople } from '../src/utils';

interface Person {
  uid: string;
  name: string;
  age: number;
}

function fetchMorePeople(): Promise<Person[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(generatePeople(10));
    }, 2000);
  });
}

export function InfiniteScroll() {
  const [fetching, setFetching] = useState(false);
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
  const [data, setData] = useState<Person[]>(generatePeople(20));

  async function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    if (
      e.currentTarget.scrollTop + 1 >=
      e.currentTarget.scrollHeight - e.currentTarget.clientHeight
    ) {
      if (!fetching) {
        setFetching(true);
        try {
          await fetchMorePeople().then(people => setData(d => d.concat(people)));
        } finally {
          setFetching(false);
        }
      }
    }
  }

  // This example derives rows from data on the client. If you want serverside
  // filtering, sorting, and pagination then generate your rows from data on
  // your server - see the Serverside section for more details.
  const rows = useClientRows<Person>({
    columns,
    data,
    getItemId: person => person.uid,
  });

  return (
    <Grid<Person>
      style={{ height: 400 }}
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      onScroll={handleScroll}
      loadingMore={fetching}
    />
  );
}
