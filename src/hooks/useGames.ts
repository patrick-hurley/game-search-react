import GameService, { GameQuery, GameResponse } from '../services/GameService'
import useCollection from './useCollection'

const useGames = (query: GameQuery, deps: any[]) => {
    const {
        data: games,
        error,
        isLoading,
    } = useCollection<GameResponse>(
        GameService,
        {
            search: query.searchText || null,
            genres: query.selectedGenre?.id || null,
            ordering: query.selectedOrder || null,
            platforms:
                query.selectedPlatform !== 'all'
                    ? query.selectedPlatform
                    : null,
        },
        deps
    )
    return { games, error, isLoading }
}

export default useGames
