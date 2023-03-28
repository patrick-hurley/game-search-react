import { SimpleGrid } from '@chakra-ui/react'
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
                        game={game}
                        isLoading={isLoading}
                        key={game.id}
                    ></GameResult>
                ))}
            </SimpleGrid>
        </>
    )
}

export default GameList
