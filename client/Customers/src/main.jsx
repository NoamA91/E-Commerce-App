import ReactDOM from 'react-dom/client'
import { extendTheme } from '@chakra-ui/react'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from './context/CartContext.jsx'
import { CurrentPageProvider } from './context/CurrentPageContext';
import { AuthProvider } from './context/AuthContext.jsx'

// Chakra UI theme
const colors = {
  ShopYellow: '#fefed5',
  ShopTeal: {
    100: '#5edac8',
    200: '#35d0ba',
    300: '#28aa98',
  },
}
const theme = extendTheme({ colors })

// Accessibility
window.addEventListener('load', function () { new Accessibility(); }, false);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <CurrentPageProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CurrentPageProvider>
    </AuthProvider>
  </ChakraProvider>
)
