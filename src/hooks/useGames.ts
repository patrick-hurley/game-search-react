import GameService, { GameResponse } from '../services/GameService'
import useData from './useData'

const useGames = (query: {}, deps: any[]) => {
    const {
        data: games,
        error,
        isLoading,
    } = useData<GameResponse>(GameService, query, deps)
    return { games, error, isLoading }
}

export default useGames
