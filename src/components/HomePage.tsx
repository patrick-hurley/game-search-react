import { Stack } from '@chakra-ui/react'
import GameHeading from './GameHeading'
import GameList from './GameList'
import OrderBy from './OrderBy'
import PlatformFilter from './PlatformFilter'
import { useGamesFilterParams } from '../hooks/useGamesFilterParams'

const HomePage = () => {
    const { gameQuery, handlePlatformSelection, handleOrderSelection } =
        useGamesFilterParams()

    return (
        <>
            <GameHeading gameQuery={gameQuery} />
            <Stack direction={{ base: 'column', md: 'row' }} mb="20px">
                <OrderBy onOrderSelect={handleOrderSelection} />
                <PlatformFilter onPlatformSelect={handlePlatformSelection} />
            </Stack>

            <GameList gameQuery={gameQuery} />
        </>
    )
}

export default HomePage
