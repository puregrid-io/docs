module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        siteName: 'Puregrid',
        description: 'A lightweight, full-featured data grid for React',
        githubRepo: 'puregrid-io/puregrid',
        sidebarCategories: {
          null: ['index', 'your-first-grid', 'grid-props', 'styling', 'rtl'],
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
            'rows/row-state',
            'rows/pagination',
            'rows/row-grouping',
            'rows/master-details-rows',
            'rows/virtual-rows',
            'rows/serverside-rows',
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
