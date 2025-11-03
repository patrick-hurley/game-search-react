import { useSearchParams } from 'react-router-dom'
import { GameQuery } from '../services/GameService'
import { Genre } from '../services/GenreService'
import useGenres from './useGenres'

export const useGamesFilterParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { genres } = useGenres()

    // Parse URL params into GameQuery object
    const genreId = searchParams.get('genre')
    const selectedGenre = genreId
        ? genres?.results.find((g) => g.id === parseInt(genreId))
        : undefined

    const gameQuery: GameQuery = {
        searchText: searchParams.get('search') || undefined,
        selectedPlatform: searchParams.get('platform') || undefined,
        selectedOrder: searchParams.get('order') || undefined,
        selectedGenre,
    }

    const handleSearch = (searchText: string) => {
        const params = new URLSearchParams(searchParams)
        if (searchText) {
            params.set('search', searchText)
        } else {
            params.delete('search')
        }
        // Clear genre when searching
        params.delete('genre')
        setSearchParams(params)
    }

    const handleGenreSelection = (selectedGenre: Genre) => {
        const params = new URLSearchParams(searchParams)
        params.set('genre', selectedGenre.id.toString())
        // Clear search when selecting genre
        params.delete('search')
        setSearchParams(params)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const handlePlatformSelection = (selectedPlatform: string | null) => {
        if (!selectedPlatform) return
        const params = new URLSearchParams(searchParams)
        if (selectedPlatform === 'all') {
            params.delete('platform')
        } else {
            params.set('platform', selectedPlatform)
        }
        setSearchParams(params)
    }

    const handleOrderSelection = (selectedOrder: string | null) => {
        if (!selectedOrder) return
        const params = new URLSearchParams(searchParams)
        params.set('order', selectedOrder)
        setSearchParams(params)
    }

    return {
        gameQuery,
        handleSearch,
        handleGenreSelection,
        handlePlatformSelection,
        handleOrderSelection,
    }
}
