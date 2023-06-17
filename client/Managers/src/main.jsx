import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContext from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AuthContext.AuthProvider>
      <App />
    </AuthContext.AuthProvider>
  </ChakraProvider>,
)
