---
title: Getting Started
description: Intro and installation
---

## Why another datagrid?

Puregrid is a datagrid for React. It was created after working on dozens of datagrids for some of the largest financial companies in the world. During that process we discovered how deficient the "industry leading" datagrids were behind their shiny websites and promises. Puregrid aims to be different in a number of ways:

- Simple and consistent API, which is declarative (controlled and props driven), rather than imperative with mostly internal state.
- Lightweight and performant. Our Javascript _and_ CSS is around 36kb minified (including tree-shakable optional extras) while "industry leaders" are in the 1-2 **megabyte** range for the JavaScript only.
- Other datagrids which support lots of frameworks use `ReactDOM.render` to render each cell individually with a significant performance penalty and loss of React Context such as your theme settings.

## Install from NPM

Install the grid into your project using npm or yarn:

```bash:title=Choose+ONE+of+the+commands
npm install @puregrid/core
yarn add @puregrid/core
```

Styles are bundled in (with no loss of performance or increased bundle size unlike other CSS-in-JS solutions).
