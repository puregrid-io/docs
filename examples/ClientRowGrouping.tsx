import React from 'react';
import { BiMedal } from 'react-icons/bi';
import { FaMedal } from 'react-icons/fa';
import { RiMedal2Line } from 'react-icons/ri';
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';
import {
  Grid,
  useColumns,
  useClientRows,
  HeaderRenderers,
  ColumnAlign,
  GroupCellRenderer,
  CellRenderers,
  Button,
  useRowState,
  css,
  useStyle,
} from '@puregrid/core';

import olympicWinners from '../static/olympicWinnersSmall.json';
import { Winner } from '../helpers/olympicWinnerHelpers';

export function ClientRowGrouping() {
  useStyle('client-row-grouping', componentStyles);
  const { columns, setColumns } = useColumns<Winner>([
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
    rowState: getRowState(),
  });

  const headerRenderers: HeaderRenderers<Winner> = {
    Gold: () => <FaMedal />,
    Silver: () => <BiMedal />,
    Bronze: () => <RiMedal2Line />,
  };

  const groupCell: GroupCellRenderer<Winner> = ({ column, row }) => {
    // Don't render anything on the group row except in the grouping cell.
    if (column.key !== row.data.colKey) {
      return null;
    }

    return (
      <>
        <Button
          className="crg-expand-btn"
          title={row.data.expanded ? 'Collapse' : 'Expand'}
          onClick={() => setRowState(row.key, { expanded: !row.data.expanded })}
        >
          {row.data.expanded ? <AiOutlineDown size={12} /> : <AiOutlineRight size={12} />}
        </Button>
        {row.data.value} ({row.data.childCount})
      </>
    );
  };

  // Don't render the grouped values as they can be seen on the grouping rows.
  const cellRenderers: CellRenderers<Winner> = {
    default: ({ column, row }) => !column.group && column.getValue(row.data),
  };

  return (
    <Grid<Winner>
      style={{ height: 600 }}
      columns={columns}
      onColumnsChange={setColumns}
      headerRenderers={headerRenderers}
      groupCell={groupCell}
      cellRenderers={cellRenderers}
      defaultColumn={{
        cellRenderer: 'default',
      }}
      rows={rows}
      getRowSize={() => 40}
      virtualRows
    />
  );
}

const componentStyles = css`
  .crg-expand-btn {
    margin-right: 6px;
    padding: 4px;
  }
`;
