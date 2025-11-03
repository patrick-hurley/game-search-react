import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import GameView from './components/GameView'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/game/:id',
        element: <GameView />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
