import { useQuery } from '@tanstack/react-query'
import GameService, { Game } from '../services/GameService'

const useGame = (id: string) => {
    const {
        data: game,
        error,
        isLoading,
    } = useQuery<Game>({
        queryKey: ['game', id],
        queryFn: async () => {
            const { response } = GameService.getById<Game>(id)
            return (await response).data
        },
    })
    return { game, error, isLoading }
}

export default useGame
