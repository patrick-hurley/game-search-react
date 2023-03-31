import { SimpleGrid, Text } from '@chakra-ui/react'
import useGames from '../hooks/useGames'
import { GameQuery } from '../services/GameService'
import GameResult from './GameResult'

interface Props {
    gameQuery: GameQuery
}

const GameList = ({ gameQuery }: Props) => {
    const { games, error, isLoading } = useGames(gameQuery, [gameQuery])

    if (error) return <Text>Could not get games</Text>

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {games?.results.map((game) => (
                    <GameResult
                        game={game}
                        isLoading={isLoading}
                        key={game.id}
                    ></GameResult>
                ))}
            </SimpleGrid>
            {!isLoading && games?.count === 0 && !error && (
                <Text>No results found.</Text>
            )}
        </>
    )
}

export default GameList
