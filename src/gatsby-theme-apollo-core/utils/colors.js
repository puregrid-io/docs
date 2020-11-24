const { colors } = require('gatsby-theme-apollo-core/src/utils/colors');
const { colors: spaceKitColors } = require('@apollo/space-kit/colors');

exports.colors = {
  ...colors,
  primary: '#3e3ab8',
  primaryLight: '#3b4af9',
  secondary: '#10aca6', // Not working.
  tertiary: '#10aca6', // Not working.
  background2: '#ecf1f4' // Not working.
};