import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  Pagination,
  Input,
  InputSize,
} from '@puregrid/core';

import { getRows } from '../fakeServer';
import { Winner, headerRenderers } from '../src/utils/olympicWinnerHelpers';

const pageSize = 10;

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
  const [serverRows, setServerRows] = useState<{ rows: Winner[]; totalRows: number }>({
    rows: [],
    totalRows: 0,
  });
  const { filterState, setFilterState, getFilterState } = useFilterState();
  const [pageIndex, setPageIndex] = useState(0);
  // Pass pageIndex into updateRowData without having to pass it in as an
  // arg and run into React Hooks "dependency hell".
  const pageIndexRef = useRef(pageIndex);
  pageIndexRef.current = pageIndex;

  const updateRowData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getRows(getColumns(), {
        filterState: getFilterState(),
        pageSize,
        pageIndex: pageIndexRef.current,
      });
      setServerRows(res);
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
  }, [pageIndex]);

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
      <Input
        value={getFilterState(column.key)}
        placeholder="Filter"
        onChange={e => setFilterState(column.key, e.target.value)}
        inputSize={InputSize.Small}
      />
    ),
    number: ({ column }) => (
      <Input
        type="number"
        min="0"
        value={getFilterState(column.key)}
        onChange={e => setFilterState(column.key, Number(e.target.value))}
        inputSize={InputSize.Small}
      />
    ),
  };

  return (
    <Grid<Winner>
      columns={columns}
      filterRenderers={filterRenderers}
      headerRenderers={headerRenderers}
      onColumnsChange={handleColumnsChange}
      rows={serverRows.rows}
      loading={loading}
      footer={
        <Pagination
          itemCount={serverRows.totalRows}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
        />
      }
    />
  );
}
