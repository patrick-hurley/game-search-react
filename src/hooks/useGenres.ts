import GenreService, { GenreResponse } from '../services/GenreService'
import useData from './useData'

const useGenres = () => {
    const { data: genres, error } = useData<GenreResponse>(GenreService)
    return { genres, error }
}

export default useGenres
