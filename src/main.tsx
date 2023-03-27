import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import './index.css'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <>
            {localStorage.setItem('chakra-ui-color-mode', 'light')}
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </>
    </React.StrictMode>
)
