import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { CanceledError } from './services/ApiClient'
import { useEffect, useState } from 'react'
import GameList from './components/GameList'
import GameService, { GameResponse } from './services/GameService'
import GenreList from './components/GenreList'
import GenreService, { Genre, GenreResponse } from './services/GenreService'
import SearchBar from './components/SearchBar'
import OrderBy from './components/OrderBy'

function App() {
    const [games, setGames] = useState<GameResponse>()
    const [genres, setGenres] = useState<GenreResponse>()

    const [errorMessageGames, setErrorMessageGames] = useState('')
    const [errorMessageGenres, setErrorMessageGenres] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [selectedGenre, setSelectedGenre] = useState<Genre>()
    const [selectedOrder, setSelectedOrder] = useState('')

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

    const handleOrderSelection = (order: string | undefined) => {
        order && setSelectedOrder(order)
    }

    useEffect(() => {
        setIsLoading(true)

        const { response, cancel } = GameService.getAll<GameResponse>({
            ...(isSearching && { search: searchText }),
            ...(!isSearching && { genres: selectedGenre?.id }),
            ...(selectedOrder && { ordering: selectedOrder }),
        })
        response
            .then((res) => {
                setGames(res.data)
                setIsLoading(false)
                setErrorMessageGames('')
            })
            .catch((err) => {
                if (err instanceof CanceledError) return
                setErrorMessageGames('Could not get games')
                setIsLoading(false)
            })

        return () => cancel()
    }, [selectedGenre, searchText, selectedOrder])

    useEffect(() => {
        const { response, cancel } = GenreService.getAll<GenreResponse>()
        response
            .then((res) => {
                setGenres(res.data)
                setErrorMessageGenres('')
            })
            .catch((err) => {
                if (err instanceof CanceledError) return
                setErrorMessageGenres('Could not get genres')
            })
        return () => cancel()
    }, [])

    return (
        <Box p="10">
            <SearchBar onSearch={handleSearch} />
            <Text fontSize="3xl" mt="20px">
                {isSearching
                    ? `Search results for '${searchText}'`
                    : selectedGenre && `Genre: ${selectedGenre.name}`}
            </Text>

            <Flex mt="10">
                <Box w="200px">
                    {genres && (
                        <GenreList
                            genres={genres}
                            onClick={handleGenreSelection}
                        />
                    )}
                    {errorMessageGenres && <Text>{errorMessageGenres}</Text>}
                </Box>

                <Box flex="1">
                    <OrderBy onOrderSelect={handleOrderSelection} />
                    {isLoading && <Spinner />}
                    {!isLoading && games && !errorMessageGames && (
                        <GameList games={games} />
                    )}
                    {!isLoading && games?.count === 0 && !errorMessageGames && (
                        <Text>No results found.</Text>
                    )}
                    {errorMessageGames && <Text>{errorMessageGames}</Text>}
                </Box>
            </Flex>
        </Box>
    )
}

export default App
