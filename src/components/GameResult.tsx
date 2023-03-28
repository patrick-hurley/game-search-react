import {
    Box,
    Heading,
    Flex,
    useColorModeValue,
    Skeleton,
} from '@chakra-ui/react'
import { Game } from '../services/GameService'
import GameImage from './GameImage'
import GameRating from './GameRating'
import PlatformIcons from './PlatformIcons'

interface Props {
    game: Game
    isLoading: boolean
}

const GameResult = ({ game, isLoading }: Props) => {
    const bg = useColorModeValue('#ececec', '#202020')

    return (
        <Skeleton isLoaded={!isLoading} borderRadius="15px">
            <Box borderRadius="15px" overflow="hidden" bg={bg}>
                <GameImage image={game.background_image} />
                <Box padding="20px 15px">
                    <Flex justify="space-between" align="center">
                        <PlatformIcons platforms={game.platforms} />
                        <GameRating rating={game.metacritic} />
                    </Flex>
                    <Heading as="h2" size="md" mt={3}>
                        {game.name}
                    </Heading>
                </Box>
            </Box>
        </Skeleton>
    )
}

export default GameResult
