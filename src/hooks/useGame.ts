import GameService, { Game } from '../services/GameService'
import useResource from './useResource'

const useGame = (id: string) => {
    const { data: game, error, isLoading } = useResource<Game>(
        GameService,
        id,
        [id]
    )
    return { game, error, isLoading }
}

export default useGame
