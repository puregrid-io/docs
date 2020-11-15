import React, { useEffect, useState } from 'react';
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';
import {
  Grid,
  useColumns,
  GroupCellProps,
  CellRenderers,
  useRowState,
  RowType,
  Row,
  Button,
  css,
  useStyle,
} from '@puregrid/core';
import { LoadingStyle } from '@puregrid/core/src/types';

interface Animal {
  species: string;
  name: string;
}

type AnimalRows = Row<Animal>[];

function initialServerFetch(): Promise<AnimalRows> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          type: RowType.GroupRow,
          key: 'species:Mammal',
          level: 0,
          data: {
            colKey: 'species',
            value: 'Mammal',
            expanded: false,
            childCount: 3,
          },
        },
      ]);
    }, 1000);
  });
}

function expandedServerFetch(): Promise<AnimalRows> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          type: RowType.GroupRow,
          key: 'species:Mammal',
          level: 0,
          data: {
            colKey: 'species',
            value: 'Mammal',
            expanded: true,
            childCount: 3,
          },
        },
        {
          type: RowType.NormalRow,
          key: 'Aardvark',
          level: 1,
          data: {
            species: 'Mammal',
            name: 'Aardvark',
          },
        },
        {
          type: RowType.NormalRow,
          key: 'Red Fox',
          level: 1,
          data: {
            species: 'Mammal',
            name: 'Red Fox',
          },
        },
        {
          type: RowType.NormalRow,
          key: 'Sloth Bear',
          level: 1,
          data: {
            species: 'Mammal',
            name: 'Sloth Bear',
          },
        },
      ]);
    }, 1000);
  });
}

export function LazyLoadingRowGroups() {
  useStyle('server-row-grouping', componentStyles);
  const { columns, setColumns } = useColumns<Animal>([
    {
      key: 'species',
      header: 'Species',
      width: '0.3fr',
      minWidth: 140,
      getValue: animal => animal.species,
      group: true,
    },
    {
      key: 'name',
      header: 'Name',
      width: '1fr',
      minWidth: 140,
      getValue: animal => animal.name,
    },
  ]);

  const [rows, setRows] = useState<AnimalRows>([]);
  const [loading, setLoading] = useState(true);
  const { getRowState, setRowState } = useRowState();

  async function fetchRows(expanded: boolean) {
    try {
      setLoading(true);

      if (!expanded) {
        setRows(await initialServerFetch());
      } else {
        setRows(await expandedServerFetch());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRows(getRowState('species:Mammal').expanded);
  }, [getRowState('species:Mammal').expanded]);

  const GroupCell = ({ column, row }: GroupCellProps<Animal>) => {
    // Don't render anything on the group row except in the grouping cell.
    if (column.key !== row.data.colKey) {
      return null;
    }

    return (
      <>
        <Button
          className="expand-btn"
          onClick={() => setRowState(row.key, { expanded: !row.data.expanded })}
        >
          {row.data.expanded ? <AiOutlineDown size={12} /> : <AiOutlineRight size={12} />}
        </Button>
        {row.data.value} ({row.data.childCount})
      </>
    );
  };

  // Don't render the grouped values as they can be seen on the grouping rows.
  const cellRenderers: CellRenderers<Animal> = {
    default: ({ column, row }) => !column.group && column.getValue(row.data),
  };

  return (
    <Grid<Animal>
      columns={columns}
      onColumnsChange={setColumns}
      GroupCell={GroupCell}
      cellRenderers={cellRenderers}
      defaultColumn={{
        cellRenderer: 'default',
      }}
      rows={rows}
      loading={loading}
    />
  );
}

const componentStyles = css`
  .expand-btn {
    margin-right: 6px;
    padding: 4px;
  }
`;
