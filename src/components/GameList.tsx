import { Select, SimpleGrid } from '@chakra-ui/react'
import { useRef } from 'react'
import { GameResponse } from '../services/GameService'
import GameResult from './GameResult'

interface Props {
    games: GameResponse
    isLoading: boolean
}

const GameList = ({ games, isLoading }: Props) => {
    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {games.results.map((game) => (
                    <GameResult
                        key={game.id}
                        name={game.name}
                        rating={parseInt(game.rating)}
                        platforms={game.platforms}
                        backgroundImage={game.background_image}
                        isLoading={isLoading}
                    ></GameResult>
                ))}
            </SimpleGrid>
        </>
    )
}

export default GameList
