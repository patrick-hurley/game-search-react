import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { CanceledError } from './services/ApiClient'
import { useEffect, useState } from 'react'
import GameList from './components/GameList'
import GameService, { GameResponse } from './services/GameService'
import GenreList from './components/GenreList'
import GenreService, { Genre, GenreResponse } from './services/GenreService'
import SearchBar from './components/SearchBar'

function App() {
    const [games, setGames] = useState<GameResponse>()
    const [genres, setGenres] = useState<GenreResponse>()

    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [isSearching, setIsSearching] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [selectedGenre, setSelectedGenre] = useState<Genre>()

    const handleSearch = (searchText: string) => {
        setIsSearching(true)
        setSelectedGenre(undefined)
        setSearchText(searchText)
    }

    const handleGenreSelection = (genre: Genre) => {
        setSelectedGenre(genre)
        setIsSearching(false)
        setSearchText('')
    }

    useEffect(() => {
        setIsLoading(true)

        const { response, cancel } = GameService.getAll<GameResponse>({
            ...(isSearching && { search: searchText }),
            ...(!isSearching && { genres: selectedGenre?.id }),
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
    }, [selectedGenre, searchText])

    useEffect(() => {
        const { response, cancel } = GenreService.getAll<GenreResponse>()
        response
            .then((res) => setGenres(res.data))
            .catch((err) => {
                if (err instanceof CanceledError) return
                setErrorMessage('Could not get genres')
            })
        return () => cancel()
    }, [])

    return (
        <Box p="10">
            <SearchBar onSearch={handleSearch} />
            <Text fontSize="3xl" mt="20px">
                {isSearching
                    ? `Search results for '${searchText}'`
                    : `Genre: ${selectedGenre?.name}`}
            </Text>

            <Flex mt="10">
                <Box w="200px">
                    {genres && (
                        <GenreList
                            genres={genres}
                            onClick={handleGenreSelection}
                        />
                    )}
                </Box>
                <Box flex="1">
                    {isLoading && <Spinner />}
                    {games && !isLoading && <GameList games={games} />}
                    {errorMessage && <p>{errorMessage}</p>}
                </Box>
            </Flex>
        </Box>
    )
}

export default App
