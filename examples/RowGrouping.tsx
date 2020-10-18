import React, { useState } from 'react';
import { BiMedal } from 'react-icons/bi';
import { FaMedal } from 'react-icons/fa';
import { RiMedal2Line } from 'react-icons/ri';
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';
import {
  Grid,
  Columns,
  ColumnAlign,
  useClientRows,
  HeaderComponents,
  GroupCellComponent,
  CellComponents,
  useRowState,
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

export function RowGrouping() {
  const [columns, setColumns] = useState<Columns<Winner>>([
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
  ]);

  const { getRowState, setRowState } = useRowState();
  const rows = useClientRows<Winner>({
    columns,
    data: olympicWinners,
    getItemId: winner => winner.id,
    getRowSize: () => 40,
    rowState: getRowState(),
  });

  const headerComponents: HeaderComponents<Winner> = {
    Gold: () => <FaMedal />,
    Silver: () => <BiMedal />,
    Bronze: () => <RiMedal2Line />,
  };

  const GroupCell: GroupCellComponent<Winner> = ({ column, row }) => {
    // Don't render anything on the group row except in the grouping cell.
    if (column.key !== row.data.colKey) {
      return null;
    }

    return (
      <>
        <button
          onClick={() => setRowState(row.key, { expanded: !row.data.expanded })}
          style={{ padding: 2 }}
        >
          {row.data.expanded ? <AiOutlineDown size={12} /> : <AiOutlineRight size={12} />}
        </button>
        {row.data.value} ({row.data.childCount})
      </>
    );
  };

  // Don't render the grouped values as they can be seen on the grouping rows.
  const cellComponents: CellComponents<Winner> = {
    default: ({ column, row }) => !column.group && column.getValue(row.data),
  };

  return (
    <Grid<Winner>
      style={{ height: 600 }}
      columns={columns}
      onColumnsChange={setColumns}
      headerComponents={headerComponents}
      GroupCell={GroupCell}
      cellComponents={cellComponents}
      defaultColumn={{
        cellComponent: 'default',
      }}
      rows={rows}
      virtualRows
    />
  );
}