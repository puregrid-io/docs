import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import useResizeObserver from 'use-resize-observer';
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai';
import {
  Grid,
  useColumns,
  useClientRows,
  RowType,
  DetailsRow,
  useRowState,
  CellRenderers,
  Button,
  css,
  useStyle,
} from '@puregrid/core';
import stocks from '../static/stocks.json';

type TimeSeries = {
  [key: string]: {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  };
};

interface Stock {
  metaData: {
    symbol: string;
    name: string;
    lastRefreshed: string;
    outputSize: string;
    timeZone: string;
  };
  timeSeries: TimeSeries;
}

interface PriceChartProps {
  row: DetailsRow<TimeSeries>;
}

function PriceChart({ row }: PriceChartProps) {
  const { ref, width, height } = useResizeObserver<HTMLDivElement>();
  const chart = useRef<IChartApi>();

  useEffect(() => {
    if (ref.current) {
      chart.current = createChart(ref.current, {
        width: 836,
        height: 300,
        rightPriceScale: {
          scaleMargins: {
            top: 0.3,
            bottom: 0.25,
          },
          borderVisible: false,
        },
      });

      const areaSeries = chart.current.addAreaSeries({
        title: 'Close price',
        lineWidth: 2,
      });

      const volumeSeries = chart.current.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });

      const times = Object.keys(row.data);

      areaSeries.setData(
        times
          .map(time => ({
            time,
            value: Number(row.data[time].close),
          }))
          .reverse()
      );

      volumeSeries.setData(
        times
          .map((time, i) => {
            const thisVol = Number(row.data[time].volume);
            const lastVol = Number(row.data[times[Math.max(0, i - 1)]].volume);
            return {
              time,
              value: thisVol,
              color:
                thisVol > lastVol ? 'rgba(44, 166, 96, 0.8)' : 'rgba(230, 44, 59, 0.8)',
            };
          })
          .reverse()
      );
    }
  }, []);

  useEffect(() => {
    if (chart.current) {
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    }
  }, [width, height]);

  return <div ref={ref} />;
}

export function MasterDetailsRows() {
  useStyle('client-row-grouping', componentStyles);
  const { getRowState, setRowState } = useRowState({
    MS: {
      expanded: true,
    },
  });
  const { columns, setColumns } = useColumns<Stock>([
    {
      key: 'expandRow',
      header: null,
      width: 52,
      getValue: stock => getRowState(stock.metaData.symbol).expanded,
      cellRenderer: 'expandRow',
      pinned: true,
    },
    {
      key: 'symbol',
      header: 'Symbol',
      width: 90,
      getValue: stock => stock.metaData.symbol,
    },
    {
      key: 'name',
      header: 'Name',
      width: '1fr',
      minWidth: 120,
      getValue: stock => stock.metaData.name,
    },
    {
      key: 'timeZone',
      header: 'Timezone',
      minWidth: 100,
      getValue: stock => stock.metaData.timeZone,
    },
  ]);

  const rows = useClientRows<Stock>({
    columns,
    data: stocks,
    getItemId: stock => stock.metaData.symbol,
    getRowDetails: row => row.timeSeries,
    rowState: getRowState(),
  });

  const cellRenderers: CellRenderers<Stock> = {
    expandRow: ({ row }) => {
      const { expanded } = getRowState(row.key);
      return (
        <Button
          className="mdr-expand-btn"
          title={expanded ? 'Collapse' : 'Expand'}
          onClick={() => setRowState(row.key, { expanded: !expanded })}
        >
          {expanded ? <AiOutlineDown size={12} /> : <AiOutlineRight size={12} />}
        </Button>
      );
    },
  };

  return (
    <Grid<Stock>
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      // You don't have to specify getRowSize unless you use virtualRows,
      // if you do specify it then you're likely to want a different height
      // for details rows.
      getRowSize={row => (row.type === RowType.DetailsRow ? 301 : 40)}
      detailsRow={PriceChart}
      stickyDetailsRow
      cellRenderers={cellRenderers}
    />
  );
}

const componentStyles = css`
  .mdr-expand-btn {
    margin-right: 6px;
    padding: 4px;
  }
`;
