import { Box, Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import GameList from './components/GameList'
import GenreList from './components/GenreList'
import GameService, { GameResponse } from './services/GameService'
import { CanceledError } from './services/ApiClient'

function App() {
    const [games, setGames] = useState<GameResponse>()
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [selectedGenre, setSelectedGenre] = useState(1)

    useEffect(() => {
        setIsLoading(true)
        const { response, cancel } = GameService.getAll<GameResponse>({
            genres: selectedGenre,
        })
        response
            .then((res) => {
                setGames(res.data)
                setIsLoading(false)
            })
            .catch((err) => {
                if (err instanceof CanceledError) return
                setErrorMessage('Could not get games')
                setIsLoading(false)
            })
        return () => cancel()
    }, [selectedGenre])

    return (
        <Flex p={10}>
            <Box w="200px">
                <GenreList onClick={(id: number) => setSelectedGenre(id)} />
            </Box>
            <Box flex="1">
                {isLoading && <Spinner />}
                {games && !isLoading && (
                    <GameList games={games} selectedGenre={selectedGenre} />
                )}
                {errorMessage && <p>{errorMessage}</p>}
            </Box>
        </Flex>
    )
}

export default App
