import {
    Box,
    Heading,
    Flex,
    useColorModeValue,
    Skeleton,
} from '@chakra-ui/react'
import { Game } from '../services/GameService'
import PlatformIcons from './PlatformIcons'

interface Props {
    game: Game
    isLoading: boolean
}

const GameResult = ({ game, isLoading }: Props) => {
    const bg = useColorModeValue('#ececec', '#202020')

    return (
        <Skeleton isLoaded={!isLoading}>
            <Box borderRadius="15px" overflow="hidden" bg={bg}>
                <Box
                    h={{ base: '250px', md: '150px' }}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    backgroundImage={game.background_image}
                />
                <Box padding="20px 15px">
                    <Flex justify="space-between" align="center">
                        <PlatformIcons platforms={game.platforms} />
                        <Box
                            border="2px solid green"
                            display="inline-block"
                            padding="1px 5px"
                            borderRadius="5px"
                            alignSelf="start"
                            fontSize="11px"
                        >
                            {game.rating}
                        </Box>
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
