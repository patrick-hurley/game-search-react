import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { CanceledError } from './services/ApiClient'
import { useEffect, useState } from 'react'
import GameList from './components/GameList'
import GameService, { GameResponse } from './services/GameService'
import GenreList from './components/GenreList'
import GenreService, { Genre, GenreResponse } from './services/GenreService'
import SearchBar from './components/SearchBar'
import OrderBy from './components/OrderBy'
import PlatformFilter from './components/PlatformFilter'
import PlatformService, { PlatformResponse } from './services/PlatformService'
import LightDarkToggle from './components/LightDarkToggle'

function App() {
    const [games, setGames] = useState<GameResponse>()
    const [genres, setGenres] = useState<GenreResponse>()
    const [platforms, setPlatforms] = useState<PlatformResponse>()

    const [errorMessageGames, setErrorMessageGames] = useState('')
    const [errorMessageGenres, setErrorMessageGenres] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [selectedGenre, setSelectedGenre] = useState<Genre>()
    const [selectedOrder, setSelectedOrder] = useState('')
    const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

    const handleSearch = (searchText: string) => {
        setIsSearching(true)
        setSelectedGenre(undefined)
        setSearchText(searchText)
    }

    const handleGenreSelection = (genre: Genre) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        setSelectedGenre(genre)
        setIsSearching(false)
        setSearchText('')
    }

    const handlePlatformSelection = (platform: string | undefined) => {
        platform && setSelectedPlatform(platform)
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
            ...(selectedPlatform !== 'all' && { platforms: selectedPlatform }),
        })
        response
            .then((res) => {
                setGames(res.data)
                setErrorMessageGames('')
                setTimeout(() => {
                    setIsLoading(false)
                }, 400)
            })
            .catch((err) => {
                if (err instanceof CanceledError) return
                setErrorMessageGames('Could not get games')
                setIsLoading(false)
            })

        return () => cancel()
    }, [selectedGenre, searchText, selectedOrder, selectedPlatform])

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

    useEffect(() => {
        const { response, cancel } = PlatformService.getAll<PlatformResponse>()
        response
            .then((res) => {
                setPlatforms(res.data)
            })
            .catch((err) => {
                if (err instanceof CanceledError) return
                console.log('Could not get platforms')
            })
        return () => cancel()
    }, [])

    return (
        <Box p="10">
            <Flex justifyContent="space-between">
                <Box flex="1">
                    <SearchBar onSearch={handleSearch} />
                </Box>
                <LightDarkToggle />
            </Flex>

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
                    <HStack mb="20px">
                        <OrderBy onOrderSelect={handleOrderSelection} />
                        {platforms && (
                            <PlatformFilter
                                platforms={platforms}
                                onPlatformSelect={handlePlatformSelection}
                            />
                        )}
                    </HStack>

                    {games && !errorMessageGames && (
                        <GameList games={games} isLoading={isLoading} />
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
