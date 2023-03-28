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

function App() {
    const [isSearching, setIsSearching] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
    const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

    const handleSearch = (searchText: string) => {
        setIsSearching(true)
        setSelectedGenre(null)
        setSearchText(searchText)
    }

    const handleGenreSelection = (genre: Genre) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        setIsSearching(false)
        setSelectedGenre(genre)
        setSearchText('')
    }

    const handlePlatformSelection = (platform: string | null) => {
        platform && setSelectedPlatform(platform)
    }

    const handleOrderSelection = (order: string | null) => {
        order && setSelectedOrder(order)
    }

    const bg = useColorModeValue('white', '#151515')

    const headingText = isSearching
        ? `Search results for '${searchText}'`
        : selectedGenre
        ? `Genre: ${selectedGenre.name}`
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

                    <GameList
                        isSearching={isSearching}
                        selectedOrder={selectedOrder}
                        searchText={searchText}
                        selectedPlatform={selectedPlatform}
                        selectedGenre={selectedGenre}
                    />
                </Box>
            </Flex>
        </Box>
    )
}

export default App
