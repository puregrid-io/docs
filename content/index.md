---
title: Getting Started
description: Intro and installation
---

## Why another datagrid?

Puregrid is a datagrid for React. It was created after working on dozens of datagrids for some of the largest financial companies in the world. During that process we discovered how deficient the "industry leading" datagrids were behind their shiny websites and promises. Puregrid aims to be different in a number of ways:

- Simple and consistent API, which is declarative (controlled and props driven), rather than imperative with mostly internal state.
- Lightweight and performant. Our Javascript, SVG, and CSS is ~45kb minified (including tree-shakable optional extras) while "industry leaders" are in the 1-2 **megabyte** range for the JavaScript only.
- Other datagrids which support lots of frameworks use `ReactDOM.render` or `ReactDOM.createPortal` to render each cell individually with a significant performance penalty and possibly loss of React Context such as your theme settings.

## Browser/device compatibility

Puregrid is designed for desktop, mobile, mouse, and touch devices. However to provide the best and most lightweight experience for 99% of users it doesn't support old browsers such as Internet Explorer. If you need to support IE you should use another datagrid.

## Install from NPM

Install the grid into your project using npm or yarn:

```bash:title=Choose+ONE+of+the+commands
npm install @puregrid/core
yarn add @puregrid/core
```

## A note on code examples

All examples in the documentation are using Typescript. If you're using vanilla JavaScript omit the types. Enums should still be used however, so when you see things like `SortDirection.Desc` you should still import and use `SortDirection`.
