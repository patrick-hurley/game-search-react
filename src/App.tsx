import {
    Box,
    Flex,
    Heading,
    Stack,
    Image,
    Show,
    useColorModeValue,
} from '@chakra-ui/react'
import { Genre } from './services/GenreService'
import { useState } from 'react'
import GameList from './components/GameList'
import GenreList from './components/GenreList'
import LightDarkToggle from './components/LightDarkToggle'
import logo from './assets/logo.png'
import OrderBy from './components/OrderBy'
import PlatformFilter from './components/PlatformFilter'
import SearchBar from './components/SearchBar'
import { GameQuery } from './services/GameService'

function App() {
    const [isSearching, setIsSearching] = useState(false)

    const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery)

    const handleSearch = (searchText: string) => {
        setIsSearching(true)
        setGameQuery({ ...gameQuery, searchText, selectedGenre: null })
    }

    const handleGenreSelection = (selectedGenre: Genre) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        setIsSearching(false)
        setGameQuery({ ...gameQuery, selectedGenre, searchText: '' })
    }

    const handlePlatformSelection = (selectedPlatform: string | null) => {
        selectedPlatform && setGameQuery({ ...gameQuery, selectedPlatform })
    }

    const handleOrderSelection = (selectedOrder: string | null) => {
        selectedOrder && setGameQuery({ ...gameQuery, selectedOrder })
    }

    const bg = useColorModeValue('white', '#151515')

    const headingText = isSearching
        ? `Search results for '${gameQuery.searchText}'`
        : gameQuery.selectedGenre
        ? `Genre: ${gameQuery.selectedGenre.name}`
        : 'Games'

    return (
        <Box p={{ base: 5, md: 7 }} bg={bg}>
            <Flex justify="space-between" align="center">
                <Image src={logo} w="60px" mr="25px" />
                <Box flex="1">
                    <SearchBar onSearch={handleSearch} />
                </Box>
                <LightDarkToggle />
            </Flex>

            <Flex mt="10">
                <Show above="md">
                    <Box w="200px">
                        <GenreList onClick={handleGenreSelection} />
                    </Box>
                </Show>

                <Box flex="1">
                    <Heading as="h2" size="xl" mb="20px">
                        {headingText}
                    </Heading>
                    <Stack direction={{ base: 'column', md: 'row' }} mb="20px">
                        <OrderBy onOrderSelect={handleOrderSelection} />
                        <PlatformFilter
                            onPlatformSelect={handlePlatformSelection}
                        />
                    </Stack>

                    <GameList isSearching={isSearching} gameQuery={gameQuery} />
                </Box>
            </Flex>
        </Box>
    )
}

export default App
