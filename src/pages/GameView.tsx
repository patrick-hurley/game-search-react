import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Skeleton } from '@chakra-ui/react'
import useGame from '../hooks/useGame'

const GameView = () => {
    const { id } = useParams<{ id: string }>()

    if (!id) {
        return <Text>Invalid game ID</Text>
    }

    const [localIsLoading, setLocalIsLoading] = useState(true)

    const { game, error, isLoading } = useGame(id)

    // UX improvement: keep skeleton for at least 500ms
    useEffect(() => {
        if (isLoading) {
            setLocalIsLoading(true)
            return
        }

        const timer = setTimeout(() => {
            setLocalIsLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [isLoading])

    if (error) {
        return <Text>Could not load game details</Text>
    }

    return (
        <Skeleton isLoaded={!localIsLoading} borderRadius="15px" height={600}>
            <Box p={{ base: 5, md: 7 }}>
                <Heading mb={4}>{game?.name}</Heading>
                {game?.background_image && (
                    <Image
                        src={game.background_image}
                        alt={game.name}
                        borderRadius="lg"
                        mb={4}
                    />
                )}
                <Text fontSize="lg" mb={2}>
                    Rating: {game?.rating}
                </Text>
                {game?.metacritic && (
                    <Text fontSize="lg" mb={2}>
                        Metacritic: {game.metacritic}
                    </Text>
                )}
                <Text fontSize="lg">
                    Platforms:{' '}
                    {game?.platforms?.map((p) => p.platform.name).join(', ')}
                </Text>
            </Box>
        </Skeleton>
    )
}

export default GameView
