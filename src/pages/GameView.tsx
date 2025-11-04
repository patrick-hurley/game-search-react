import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Image, Skeleton, Flex } from '@chakra-ui/react'
import useGame from '../hooks/useGame'
import GameRating from '../components/GameRating'
import PlatformIcons from '../components/PlatformIcons'

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
        <Box
            p={{ base: 5, md: 7 }}
            width={{ base: '100%', md: '550px', lg: '800px' }}
            mx="auto"
        >
            <Skeleton isLoaded={!localIsLoading} borderRadius="lg" mb={4}>
                <Heading mb={4}>{game?.name || 'Loading...'}</Heading>
            </Skeleton>

            <Skeleton isLoaded={!localIsLoading} borderRadius="lg" mb={4}>
                <Image
                    src={game?.background_image}
                    alt={game?.name}
                    borderRadius="lg"
                    mb={4}
                    height={{ base: '250px', md: '450px' }}
                    width="100%"
                    objectFit="cover"
                />
            </Skeleton>

            {!localIsLoading && (
                <>
                    <Text mb={4}>
                        {game?.description?.replace(/<[^>]*>/g, '')}
                    </Text>
                    <Flex gap={5} align="center">
                        <GameRating rating={game?.metacritic} />
                        <PlatformIcons platforms={game?.platforms || []} />
                    </Flex>
                </>
            )}
        </Box>
    )
}

export default GameView
