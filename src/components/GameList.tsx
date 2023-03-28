import { SimpleGrid, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useGames from '../hooks/useGames'
import { CanceledError } from '../services/ApiClient'
import GameService, { GameResponse } from '../services/GameService'
import { Genre } from '../services/GenreService'
import GameResult from './GameResult'

interface Props {
    isSearching: boolean
    selectedOrder: string | null
    searchText: string
    selectedPlatform: string
    selectedGenre: Genre | null
}

const GameList = ({
    isSearching,
    selectedOrder,
    searchText,
    selectedPlatform,
    selectedGenre,
}: Props) => {
    const searchQuery = {
        search: isSearching ? searchText : null,
        genres: !isSearching ? selectedGenre?.id : null,
        ordering: selectedOrder,
        platforms: selectedPlatform !== 'all' ? selectedPlatform : null,
    }

    const { games, error, isLoading } = useGames(searchQuery, [
        selectedGenre,
        searchText,
        selectedOrder,
        selectedPlatform,
    ])

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
