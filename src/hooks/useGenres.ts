import { useQuery } from '@tanstack/react-query'
import GenreService, { GenreResponse } from '../services/GenreService'

const useGenres = () => {
    const { data: genres, error } = useQuery<GenreResponse>({
        queryKey: ['genres'],
        queryFn: async () => {
            const { response } = GenreService.getAll<GenreResponse>()
            return (await response).data
        },
    })
    return { genres, error }
}

export default useGenres
