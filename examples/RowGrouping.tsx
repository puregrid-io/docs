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
  GroupCellComponent,
  CellRenderers,
  useRowState,
} from '@puregrid/core';

import olympicWinners from '../static/olympicWinnersSmall.json';
import { Winner, columnDefs } from '../helpers/olympicWinnerHelpers';

export function RowGrouping() {
  const { columns, setColumns } = useColumns<Winner>(columnDefs);

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
  const cellRenderers: CellRenderers<Winner> = {
    default: ({ column, row }) => !column.group && column.getValue(row.data),
  };

  return (
    <Grid<Winner>
      style={{ height: 600 }}
      columns={columns}
      onColumnsChange={setColumns}
      headerRenderers={headerRenderers}
      GroupCell={GroupCell}
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
