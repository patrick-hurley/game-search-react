import { SimpleGrid, Text } from '@chakra-ui/react'
import useGames from '../hooks/useGames'
import { GameQuery } from '../services/GameService'
import GameResult from './GameResult'

interface Props {
    gameQuery: GameQuery
}

const GameList = ({ gameQuery }: Props) => {
    const { games, error, isLoading } = useGames(gameQuery)
    const skeletons = Array(12).fill(0)

    if (error) return <Text>Could not get games</Text>

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {isLoading
                    ? skeletons.map((_, index) => (
                          <GameResult
                              game={{} as any}
                              isLoading={true}
                              key={`skeleton-${index}`}
                          />
                      ))
                    : games?.results.map((game) => (
                          <GameResult
                              game={game}
                              isLoading={false}
                              key={game.id}
                          />
                      ))}
            </SimpleGrid>
            {!isLoading && games?.count === 0 && !error && (
                <Text>No results found.</Text>
            )}
        </>
    )
}

export default GameList
