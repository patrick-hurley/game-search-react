import { useQuery } from '@tanstack/react-query'
import GameService, { GameQuery, GameResponse } from '../services/GameService'

const useGames = (query: GameQuery) => {
    const params = {
        search: query.searchText || null,
        genres: query.selectedGenre?.id || null,
        ordering: query.selectedOrder || null,
        platforms:
            query.selectedPlatform !== 'all' ? query.selectedPlatform : null,
    }

    const {
        data: games,
        error,
        isLoading,
    } = useQuery<GameResponse>({
        queryKey: ['games', params],
        queryFn: async () => {
            const { response } = GameService.getAll<GameResponse>(params)
            return (await response).data
        },
    })

    return { games, error, isLoading }
}

export default useGames
