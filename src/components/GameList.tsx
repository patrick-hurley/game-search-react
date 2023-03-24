import { Box, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CanceledError } from '../services/ApiClient'

import GameService, { GameResponse } from '../services/GameService'
import GameResult from './GameResult'

interface Props {
    selectedGenre: number
}

const GameList = ({ selectedGenre }: Props) => {
    const [games, setGames] = useState<GameResponse>()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const { response, cancel } = GameService.getAll<GameResponse>({
            genres: selectedGenre,
        })
        response
            .then((res) => setGames(res.data))
            .catch((err) => {
                if (err instanceof CanceledError) return
                setErrorMessage('Could not get games')
            })
        return () => cancel()
    }, [selectedGenre])

    return (
        <>
            <SimpleGrid columns={3} spacing={10}>
                {games?.results.map((game) => (
                    <GameResult
                        key={game.id}
                        name={game.name}
                        rating={parseInt(game.rating)}
                        platforms={game.platforms}
                        backgroundImage={game.background_image}
                    ></GameResult>
                ))}
                {errorMessage && <p>{errorMessage}</p>}
            </SimpleGrid>
        </>
    )
}

export default GameList
