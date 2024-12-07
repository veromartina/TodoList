
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme} from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider  theme={extendTheme}>
    <App />
    </ChakraProvider>
  </StrictMode>,
)
  //si lo quito deja de funcionar el modo claro/oscuro