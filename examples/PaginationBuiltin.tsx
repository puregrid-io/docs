import React, { useState } from 'react';
import {
  Grid,
  Columns,
  ColumnAlign,
  Pagination,
  useClientRows,
  Direction,
  ValueSource,
} from '@puregrid/core';
import top100cryptos from './top100cryptos.json';

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
const fmtNum = new Intl.NumberFormat('en-US').format;

export function PaginationBuiltin() {
  const [columns, setColumns] = useState<Columns<DigitalAsset>>([
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
        source !== ValueSource.Sort ? fmtCcy(asset.price_usd) : asset.price_usd,
      align: ColumnAlign.End,
    },
    {
      key: 'marketCap',
      header: 'Market Cap (USD)',
      width: '1fr',
      minWidth: 160,
      getValue: (asset, source) =>
        source !== ValueSource.Sort ? fmtCcy(asset.market_cap_usd) : asset.market_cap_usd,
      align: ColumnAlign.End,
    },
    {
      key: 'volume24',
      header: 'Volume (24h)',
      width: 160,
      getValue: (asset, source) =>
        source !== ValueSource.Sort ? fmtNum(asset.volume24) : asset.volume24,
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

  return (
    <>
      <p>
        <select value={direction} onChange={e => setDirection(e.currentTarget.value)}>
          <option value={Direction.Ltr}>Left to right</option>
          <option value={Direction.Rtl}>Right to left</option>
        </select>
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
