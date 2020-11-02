import {
  Columns,
  Column,
  flatFilterColumns,
  builtinFilters,
  FilterState,
} from '@puregrid/core';
import { Winner } from '../helpers/olympicWinnerHelpers';

// What about getValue usage on an actual server!? The server could use the col key
function filter(filterCols: Column<Winner>[], data: Winner[], filterState: FilterState) {
  const filters = filterCols
    .filter(c => Boolean(filterState[c.key]))
    .map(c => ({
      column: c,
      fn: builtinFilters[c.filter as any],
    }));

  return data.filter(item =>
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
  const filterCols = flatFilterColumns(columns, column => column.filter);
  return filter(filterCols, data, filterState);
}
