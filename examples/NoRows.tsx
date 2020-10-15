import React, { useState } from 'react';
import { Grid, Columns } from '@puregrid/core';

export function NoRows() {
  const [columns, setColumns] = useState<Columns>([
    {
      key: 'player',
      header: 'Player',
      getValue: player => player.name,
      width: 140,
    },
    {
      key: 'skill',
      header: 'Skill',
      getValue: player => player.skill,
      width: 80,
    },
  ]);

  return (
    <Grid
      columns={columns}
      onColumnsChange={setColumns}
      rows={[]}
      noRows={<div>No rows to display 😔</div>}
    />
  );
}
