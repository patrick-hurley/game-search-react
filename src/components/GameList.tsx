import { Select, SimpleGrid } from '@chakra-ui/react'
import { useRef } from 'react'
import { GameResponse } from '../services/GameService'
import GameResult from './GameResult'

interface Props {
    games: GameResponse
}

const GameList = ({ games }: Props) => {
    return (
        <>
            <SimpleGrid columns={3} spacing={5}>
                {games.results.map((game) => (
                    <GameResult
                        key={game.id}
                        name={game.name}
                        rating={parseInt(game.rating)}
                        platforms={game.platforms}
                        backgroundImage={game.background_image}
                    ></GameResult>
                ))}
            </SimpleGrid>
        </>
    )
}

export default GameList
