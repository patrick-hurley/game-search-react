import { SimpleGrid, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CanceledError } from '../services/ApiClient'
import GameService, { GameResponse } from '../services/GameService'
import { Genre } from '../services/GenreService'
import GameResult from './GameResult'

interface Props {
    isSearching: boolean
    selectedOrder: string
    searchText: string
    selectedPlatform: string
    selectedGenre: Genre | undefined
}

const GameList = ({
    isSearching,
    selectedOrder,
    searchText,
    selectedPlatform,
    selectedGenre,
}: Props) => {
    const [games, setGames] = useState<GameResponse>()
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        const { response, cancel } = GameService.getAll<GameResponse>({
            ...(isSearching && { search: searchText }),
            ...(!isSearching && { genres: selectedGenre?.id }),
            ...(selectedOrder && { ordering: selectedOrder }),
            ...(selectedPlatform !== 'all' && { platforms: selectedPlatform }),
        })
        response
            .then((res) => {
                setGames(res.data)
                setErrorMessage('')
                setTimeout(() => {
                    setIsLoading(false)
                }, 400)
            })
            .catch((err) => {
                if (err instanceof CanceledError) return
                setErrorMessage('Could not get games')
                setIsLoading(false)
            })

        return () => cancel()
    }, [selectedGenre, searchText, selectedOrder, selectedPlatform])

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
            {!isLoading && games?.count === 0 && !errorMessage && (
                <Text>No results found.</Text>
            )}
            {errorMessage && <Text>{errorMessage}</Text>}
        </>
    )
}

export default GameList
