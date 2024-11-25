// src/theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e3f9f3',
      100: '#c1eac7',
      200: '#a3d9a9',
      300: '#7bc08f',
      400: '#57a77d',
      500: '#3f8c6f',
      600: '#2e6c58',
      700: '#1f4c41',
      800: '#0f2c2a',
      900: '#001413',
    },
  },
});

export default theme;