import { Box, Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import GameList from './components/GameList'
import GenreList from './components/GenreList'
import GameService, { GameResponse } from './services/GameService'
import { CanceledError } from './services/ApiClient'
import SearchBar from './components/SearchBar'

function App() {
    const [games, setGames] = useState<GameResponse>()
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [isSearching, setIsSearching] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [selectedGenre, setSelectedGenre] = useState(1)

    const handleSearch = (searchText: string) => {
        setIsSearching(true)
        setSelectedGenre(null)
        setSearchText(searchText)
    }

    useEffect(() => {
        setIsLoading(true)

        const { response, cancel } = GameService.getAll<GameResponse>({
            ...(isSearching && { search: searchText }),
            ...(!isSearching && { genres: selectedGenre }),
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

        setIsSearching(false)
        return () => cancel()
    }, [selectedGenre, searchText])

    return (
        <Box p="10">
            <SearchBar onSearch={handleSearch} />

            <Flex mt="10">
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
        </Box>
    )
}

export default App
