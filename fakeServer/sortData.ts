import {
  Columns,
  Column,
  flatFilterColumns,
  ValueSource,
  SortDirection,
} from '@puregrid/core';
import { Winner } from '../helpers/olympicWinnerHelpers';

const collator = new Intl.Collator();

function defaultSort<T>(column: Column<T>, itemA: T, itemB: T) {
  const a = column.getValue(itemA, ValueSource.Sort) as any;
  const b = column.getValue(itemB, ValueSource.Sort) as any;

  if (typeof a === 'string') {
    return column.sortDirection === SortDirection.Asc
      ? collator.compare(a, b)
      : collator.compare(b, a);
  }

  return column.sortDirection === SortDirection.Asc ? a - b : b - a;
}

function sort(sortCols: Column<Winner>, data: Winner[]) {
  return data.sort((itemA: Winner, itemB: Winner) => {
    let finalRes = 0;
    for (let i = 0; i < sortCols.length; i++) {
      const sortFn = defaultSort;
      const res = sortFn(sortCols[i], itemA, itemB);
      if (res !== 0) {
        return res;
      }
      finalRes = res;
    }
    return finalRes;
  });
}

export function sortData(columns: Columns<Winner>, data: Winner[]) {
  const sortCols = flatFilterColumns(columns, column => column.sortDirection);
  return sort(sortCols, data);
}
