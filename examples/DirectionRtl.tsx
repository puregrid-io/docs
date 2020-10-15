import React, { useState } from 'react';
import { Grid, Columns, Direction, useClientRows } from '@puregrid/core';

interface Country {
  code: string;
  name: string;
  dialCode: string;
}

const data: Country[] = [
  {
    code: 'AD',
    name: 'أندورا',
    dialCode: '+376',
  },
  {
    code: 'AE',
    name: 'الامارات العربية المتحدة',
    dialCode: '+971',
  },
  {
    code: 'AF',
    name: 'أفغانستان',
    dialCode: '+93',
  },
  {
    code: 'AG',
    name: 'أنتيجوا وبربودا',
    dialCode: '+1',
  },
  {
    code: 'AI',
    name: 'أنجويلا',
    dialCode: '+1',
  },
  {
    code: 'AL',
    name: 'ألبانيا',
    dialCode: '+355',
  },
  {
    code: 'AM',
    name: 'أرمينيا',
    dialCode: '+374',
  },
];

export function DirectionRtl() {
  const [columns, setColumns] = useState<Columns<Country>>([
    {
      key: 'code',
      header: 'Code',
      getValue: country => country.code,
      width: 80,
    },
    {
      key: 'dialCode',
      header: 'Dial code',
      getValue: country => country.dialCode,
      width: 100,
    },
    {
      key: 'name',
      header: 'Name',
      getValue: country => country.name,
      width: 120,
    },
  ]);

  // This example derives rows from data on the client. If you want serverside
  // filtering, sorting, and pagination then generate your rows from data on
  // your server - see the Serverside section for more details.
  const rows = useClientRows<Country>({
    columns,
    data,
    getItemId: country => country.code,
  });

  return (
    <Grid<Country>
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      direction={Direction.Rtl}
    />
  );
}
