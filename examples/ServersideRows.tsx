import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import {
  Grid,
  Columns,
  useColumns,
  useFilterState,
  FilterRenderers,
  ColumnAlign,
  ColumnsChangeDetails,
  ColumnsChangeType,
} from '@puregrid/core';

import { getRows } from '../fakeServer';
import { Winner, headerRenderers } from '../helpers/olympicWinnerHelpers';

export function ServersideRows() {
  const [loading, setLoading] = useState(false);
  const { columns, setColumns, getColumns } = useColumns<Winner>([
    {
      key: 'country',
      header: 'Country',
      width: '1fr',
      minWidth: 120,
      getValue: winner => winner.country,
      group: true,
      filterRenderer: 'string',
      filter: 'partialStringMatch',
    },
    {
      key: 'year',
      header: 'Year',
      width: 120,
      getValue: winner => winner.year,
      group: true,
      filterRenderer: 'number',
      filter: 'exactMatch',
    },
    {
      key: 'date',
      header: 'Date',
      width: 100,
      getValue: winner => winner.date,
      filterRenderer: 'string',
      filter: 'partialStringMatch',
    },
    {
      key: 'athlete',
      header: 'Athlete',
      width: '1fr',
      minWidth: 120,
      getValue: winner => winner.athlete,
      filterRenderer: 'string',
      filter: 'partialStringMatch',
    },
    {
      key: 'sport',
      header: 'Sport',
      width: 100,
      getValue: winner => winner.sport,
      filterRenderer: 'string',
      filter: 'partialStringMatch',
    },
    {
      key: 'medals',
      header: 'Medals',
      children: [
        {
          key: 'gold',
          header: 'Gold',
          width: 60,
          getValue: winner => winner.gold,
          align: ColumnAlign.End,
          filterRenderer: 'number',
          filter: 'exactMatch',
        },
        {
          key: 'silver',
          header: 'Silver',
          width: 60,
          getValue: winner => winner.silver,
          align: ColumnAlign.End,
          filterRenderer: 'number',
          filter: 'exactMatch',
        },
        {
          key: 'bronze',
          header: 'Bronze',
          width: 60,
          getValue: winner => winner.bronze,
          align: ColumnAlign.End,
          filterRenderer: 'number',
          filter: 'exactMatch',
        },
        {
          key: 'total',
          header: 'Total',
          width: 60,
          getValue: winner => winner.total,
          align: ColumnAlign.End,
          filterRenderer: 'number',
          filter: 'exactMatch',
        },
      ],
    },
  ]);
  const [rows, setRows] = useState<Winner[]>([]);
  const { filterState, setFilterState, getFilterState } = useFilterState();

  const updateRowData = useCallback(async () => {
    try {
      setLoading(true);
      const nextRows = await getRows(getColumns(), { filterState: getFilterState() });
      setRows(nextRows);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getColumns, getFilterState]);

  const debouncedUpdateRowData = useCallback(
    debounce(() => updateRowData(), 300),
    []
  );

  useEffect(() => {
    updateRowData();
  }, []);

  useEffect(() => {
    debouncedUpdateRowData();
  }, [filterState]);

  function handleColumnsChange(
    nextColumns: Columns<Winner>,
    detail: ColumnsChangeDetails
  ) {
    setColumns(nextColumns, () => {
      if (detail.type === ColumnsChangeType.Sort) {
        updateRowData();
      }
    });
  }

  const filterRenderers: FilterRenderers<Winner> = {
    string: ({ column }) => (
      <input
        value={getFilterState(column.key)}
        placeholder="Filter"
        onChange={e => setFilterState(column.key, e.target.value)}
      />
    ),
    number: ({ column }) => (
      <input
        type="number"
        min="0"
        value={getFilterState(column.key)}
        onChange={e => setFilterState(column.key, Number(e.target.value))}
      />
    ),
  };

  return (
    <Grid<Winner>
      style={{ height: 500 }}
      columns={columns}
      filterRenderers={filterRenderers}
      headerRenderers={headerRenderers}
      onColumnsChange={handleColumnsChange}
      rows={rows}
      virtualRows
      getRowSize={() => 40}
      loading={loading}
    />
  );
}
