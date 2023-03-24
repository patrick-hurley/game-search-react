import { useEffect, useState } from 'react'
import { CanceledError } from '../services/ApiClient'

import GameService, { GameResponse } from '../services/GameService'

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
            <div>GameList</div>
            {games?.results.map((game) => (
                <p key={game.id}>{game.name}</p>
            ))}
            {errorMessage && <p>{errorMessage}</p>}
        </>
    )
}

export default GameList
