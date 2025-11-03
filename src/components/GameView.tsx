import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Spinner } from '@chakra-ui/react'
import useGame from '../hooks/useGame'

const GameView = () => {
    const { id } = useParams<{ id: string }>()
    const { game, error, isLoading } = useGame(id!)

    if (isLoading) {
        return (
            <Box textAlign="center" p={10}>
                <Spinner size="xl" />
            </Box>
        )
    }

    if (error) {
        return <Text>Could not load game details</Text>
    }

    if (!game) {
        return <Text>Game not found</Text>
    }

    return (
        <Box p={{ base: 5, md: 7 }}>
            <Heading mb={4}>{game.name}</Heading>
            {game.background_image && (
                <Image
                    src={game.background_image}
                    alt={game.name}
                    borderRadius="lg"
                    mb={4}
                />
            )}
            <Text fontSize="lg" mb={2}>
                Rating: {game.rating}
            </Text>
            {game.metacritic && (
                <Text fontSize="lg" mb={2}>
                    Metacritic: {game.metacritic}
                </Text>
            )}
            <Text fontSize="lg">
                Platforms:{' '}
                {game.platforms?.map((p) => p.platform.name).join(', ')}
            </Text>
        </Box>
    )
}

export default GameView
