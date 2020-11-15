import React, { useState, useEffect } from 'react';
import { Grid, useColumns, ColumnAlign, Pagination, useClientRows } from '@puregrid/core';

interface Product {
  ProductID: number;
  ProductName: string;
  SupplierID: number;
  CategoryID: number;
  QuantityPerUnit: string;
  UnitPrice: number;
  UnitsInStock: number;
  UnitsOnOrder: number;
  ReorderLevel: number;
  Discontinued: boolean;
  Category: {
    CategoryID: number;
    CategoryName: string;
    Description: string;
  };
}

const pageSize = 10;

export function ColumnGrouping() {
  const { columns, setColumns } = useColumns<Product>([
    {
      key: 'productId',
      header: 'ID',
      width: 50,
      getValue: p => p.ProductID,
      pinned: true,
    },
    {
      key: 'productInfo',
      header: 'Product Information',
      children: [
        {
          key: 'productName',
          header: 'Name',
          width: 250,
          getValue: p => p.ProductName,
        },
        {
          key: 'unit',
          header: 'Unit',
          children: [
            {
              key: 'unitPrice',
              header: 'Price',
              width: 90,
              getValue: p => p.UnitPrice,
              align: ColumnAlign.End,
            },
            {
              key: 'unitsInStock',
              header: 'Units in stock',
              width: 90,
              getValue: p => p.UnitsInStock,
              align: ColumnAlign.End,
            },
          ],
        },
      ],
    },
    {
      key: 'category',
      header: 'Category',
      children: [
        {
          key: 'categoryName',
          header: 'Category Name',
          width: 180,
          getValue: p => p.Category.CategoryName,
        },
        {
          key: 'categoryDesc',
          header: 'Category Description',
          width: '1fr',
          minWidth: 400,
          getValue: p => p.Category.Description,
        },
      ],
    },
  ]);

  const [data, setData] = useState<Product[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  const rows = useClientRows<Product>({
    columns,
    data,
    getItemId: product => product.ProductID,
    pageIndex,
    pageSize,
  });

  useEffect(() => {
    fetch('/products.json', {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <Grid<Product>
      columns={columns}
      onColumnsChange={setColumns}
      rows={rows}
      getRowSize={() => 40}
      footer={
        <Pagination
          itemCount={data.length}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
        />
      }
    />
  );
}
