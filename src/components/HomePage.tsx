import {
    Box,
    Flex,
    Stack,
    Image,
    Show,
    useColorModeValue,
} from '@chakra-ui/react'

import { GameQuery } from '../services/GameService'
import { Genre } from '../services/GenreService'
import { useState } from 'react'
import GameHeading from './GameHeading'
import GameList from './GameList'
import GenreList from './GenreList'
import LightDarkToggle from './LightDarkToggle'
import logo from '../assets/logo.png'
import OrderBy from './OrderBy'
import PlatformFilter from './PlatformFilter'
import SearchBar from './SearchBar'

const HomePage = () => {
    const [gameQuery, setGameQuery] = useState<GameQuery>({})

    const handleSearch = (searchText: string) => {
        setGameQuery({ ...gameQuery, searchText, selectedGenre: null })
    }

    const handleGenreSelection = (selectedGenre: Genre) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        setGameQuery({ ...gameQuery, selectedGenre, searchText: '' })
    }

    const handlePlatformSelection = (selectedPlatform: string | null) => {
        selectedPlatform && setGameQuery({ ...gameQuery, selectedPlatform })
    }

    const handleOrderSelection = (selectedOrder: string | null) => {
        selectedOrder && setGameQuery({ ...gameQuery, selectedOrder })
    }

    const bg = useColorModeValue('white', '#151515')

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
                    <GameHeading gameQuery={gameQuery} />
                    <Stack direction={{ base: 'column', md: 'row' }} mb="20px">
                        <OrderBy onOrderSelect={handleOrderSelection} />
                        <PlatformFilter
                            onPlatformSelect={handlePlatformSelection}
                        />
                    </Stack>

                    <GameList gameQuery={gameQuery} />
                </Box>
            </Flex>
        </Box>
    )
}

export default HomePage
