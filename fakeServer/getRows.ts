import { Columns, createNormalRows, FilterState } from '@puregrid/core';
import olympicWinners from '../static/olympicWinnersSmall.json';
import { Winner } from '../helpers/olympicWinnerHelpers';
import { filterData } from './filterData';
import { sortData } from './sortData';

interface GetRowOptions {
  filterState?: FilterState;
}

export function getRows(columns: Columns<Winner>, options: GetRowOptions) {
  return new Promise<Winner[]>(resolve => {
    const filteredData = filterData(columns, olympicWinners, options.filterState);
    const sortedData = sortData(columns, filteredData);
    const rows = createNormalRows<Winner>(sortedData, winner => winner.id);
    setTimeout(() => resolve(rows), 1000);
  });
}
