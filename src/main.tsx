import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <>
            {localStorage.setItem('chakra-ui-color-mode', 'dark')}
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </>
    </React.StrictMode>
)
