import { Columns, createNormalRows, FilterState, paginateRows } from '@puregrid/core';
import olympicWinners from '../static/olympicWinnersSmall.json';
import { Winner } from '../helpers/olympicWinnerHelpers';
import { filterData } from './filterData';
import { sortData } from './sortData';

interface GetRowOptions {
  filterState?: FilterState;
  pageSize: number;
  pageIndex: number;
}

export function getRows(columns: Columns<Winner>, options: GetRowOptions) {
  return new Promise<{ rows: Winner[]; totalRows: number }>(resolve => {
    const filteredData = filterData(columns, olympicWinners, options.filterState);
    const sortedData = sortData(columns, filteredData);
    const rows = createNormalRows<Winner>(sortedData, winner => winner.id);
    const paginatedRows = paginateRows<Winner>(rows, options.pageSize, options.pageIndex);
    setTimeout(() => resolve({ rows: paginatedRows, totalRows: rows.length }), 1000);
  });
}
