import { SimpleGrid, Text } from '@chakra-ui/react'
import useGames from '../hooks/useGames'
import { GameQuery } from '../services/GameService'
import GameResult from './GameResult'

interface Props {
    isSearching: boolean
    gameQuery: GameQuery
}

const GameList = ({ isSearching, gameQuery }: Props) => {
    const searchQuery = {
        search: isSearching ? gameQuery.searchText : null,
        genres: !isSearching ? gameQuery.selectedGenre?.id : null,
        ordering: gameQuery.selectedOrder,
        platforms:
            gameQuery.selectedPlatform !== 'all'
                ? gameQuery.selectedPlatform
                : null,
    }

    const { games, error, isLoading } = useGames(searchQuery, [gameQuery])

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
            {error && <Text>Could not get games</Text>}
        </>
    )
}

export default GameList
