import ReactDOM from 'react-dom/client'
import { extendTheme } from '@chakra-ui/react'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'

const colors = {
  ShopYellow: '#fefed5',
  ShopTeal: {
    100: '#5edac8',
    200: '#35d0ba',
    300: '#28aa98',
  },
}

const theme = extendTheme({ colors })


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)
