import {
  Columns,
  Column,
  filterColumns,
  builtinFilters,
  FilterState,
} from '@puregrid/core';
import { Winner } from '../helpers/olympicWinnerHelpers';

function filter(filterCols: Column<Winner>[], data: Winner[], filterState: FilterState) {
  const filters = filterCols
    .filter(c => Boolean(filterState[c.key]))
    .map(c => ({
      column: c,
      fn: builtinFilters[c.filter as any],
    }));

  return data.filter((item: T) =>
    filters.every(filter =>
      filter.fn(filter.column, item, filterState[filter.column.key])
    )
  );
}

export function filterData(
  columns: Columns<Winner>,
  data: Winner[],
  filterState: FilterState = {}
) {
  const filterCols = filterColumns(columns, column => column.filter);
  return filter(filterCols, data, filterState);
}
