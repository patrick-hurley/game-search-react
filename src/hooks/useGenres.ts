import GenreService, { GenreResponse } from '../services/GenreService'
import useCollection from './useCollection'

const useGenres = () => {
    const { data: genres, error } = useCollection<GenreResponse>(GenreService)
    return { genres, error }
}

export default useGenres
