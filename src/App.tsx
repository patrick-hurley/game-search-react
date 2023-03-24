import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import GameList from './components/GameList'
import GenreList from './components/GenreList'

function App() {
    const [selectedGenre, setSelectedGenre] = useState(1)

    return (
        <Box p={50}>
            <GenreList onClick={(id: number) => setSelectedGenre(id)} />
            <Box mt={5}>
                <GameList selectedGenre={selectedGenre} />
            </Box>
        </Box>
    )
}

export default App
