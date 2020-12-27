module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        siteName: 'Puregrid',
        description: 'A full-featured, lightweight data grid for React',
        githubRepo: 'puregrid-io/puregrid',
        algoliaApiKey: '4ab9f31404cc2b2360ca0a27f8f4bbc0',
        algoliaIndexName: 'puregrid',
        sidebarCategories: {
          null: ['index', 'your-first-grid', 'grid-props', 'styling', 'rtl', 'csv-export'],
          Columns: [
            'columns/column-definitions',
            'columns/column-widths',
            'columns/column-alignment',
            'columns/column-pinning',
            'columns/column-grouping',
            'columns/header-rendering',
            'columns/column-sorting',
            'columns/column-filtering',
          ],
          Rows: [
            'rows/client-vs-server-rows',
            'rows/row-state',
            'rows/row-selection',
            'rows/pagination',
            'rows/infinite-scrolling',
            'rows/row-grouping',
            'rows/master-details-rows',
            'rows/virtual-rows',
          ],
          Cells: [
            'cells/cell-rendering',
            'cells/cell-editing',
            'cells/cell-selection',
          ],
        },
      },
    },
  ],
};
