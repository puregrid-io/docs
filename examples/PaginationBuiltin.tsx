import React, { useState } from 'react';
import {
  Grid,
  useColumns,
  ColumnAlign,
  Pagination,
  useClientRows,
  Direction,
  ValueSource,
  Button,
  saveToCsv,
} from '@puregrid/core';
import top100cryptos from '../static/top100cryptos.json';

interface DigitalAsset {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

const pageSize = 10;
const fmtCcy = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  .format;

export function PaginationBuiltin() {
  const { columns, setColumns } = useColumns<DigitalAsset>([
    {
      key: 'rank',
      header: 'Rank',
      width: 68,
      getValue: asset => asset.rank,
      pinned: true,
    },
    {
      key: 'symbol',
      header: 'Symbol',
      width: 100,
      getValue: asset => asset.symbol,
    },
    {
      key: 'name',
      header: 'Name',
      width: 140,
      getValue: asset => asset.name,
    },
    {
      key: 'price',
      header: 'Price (USD)',
      width: 160,
      getValue: (asset, source) =>
        source === ValueSource.Cell ? fmtCcy(asset.price_usd) : asset.price_usd,
      align: ColumnAlign.End,
    },
    {
      key: 'marketCap',
      header: 'Market Cap (USD)',
      width: '1fr',
      minWidth: 160,
      getValue: (asset, source) =>
        source === ValueSource.Cell ? fmtCcy(asset.market_cap_usd) : asset.market_cap_usd,
      align: ColumnAlign.End,
    },
    {
      key: 'volume24',
      header: 'Volume (24h)',
      width: 160,
      getValue: (asset, source) =>
        source === ValueSource.Cell ? fmtCcy(asset.volume24) : asset.volume24,
      align: ColumnAlign.End,
    },
  ]);

  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(Direction.Ltr);

  const rows = useClientRows<DigitalAsset>({
    columns,
    data: top100cryptos.data,
    getItemId: asset => asset.id,
    pageIndex,
    pageSize,
  });

  function handleExportClick() {
    saveToCsv({
      columns,
      data: top100cryptos.data,
    });
  }

  return (
    <>
      <p>
        <select value={direction} onChange={e => setDirection(e.currentTarget.value)}>
          <option value={Direction.Ltr}>Left to right</option>
          <option value={Direction.Rtl}>Right to left</option>
        </select>
        <button style={{ marginLeft: 16 }} onClick={handleExportClick}>
          Export to CSV
        </button>
      </p>
      <Grid<DigitalAsset>
        direction={direction}
        columns={columns}
        onColumnsChange={setColumns}
        rows={rows}
        getRowSize={() => 40}
        footer={
          <Pagination
            direction={direction}
            itemCount={top100cryptos.data.length}
            pageIndex={pageIndex}
            pageSize={pageSize}
            onPageChange={setPageIndex}
          />
        }
      />
    </>
  );
}
