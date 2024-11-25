import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
//import { BrowserRouter } from 'react-router-dom'
// New code (using HashRouter)
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import theme from './theme'

/*
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
*/

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>
)