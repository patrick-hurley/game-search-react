import { Box, Show } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import GenreList from './GenreList'
import { useGamesFilterParams } from '../hooks/useGamesFilterParams'
import { Genre } from '../services/GenreService'

const Sidebar = () => {
    const { handleGenreSelection } = useGamesFilterParams()
    const navigate = useNavigate()
    const location = useLocation()

    const onGenreClick = (genre: Genre) => {
        // If not on homepage, navigate with genre param
        if (location.pathname !== '/') {
            navigate(`/?genre=${genre.id}`)
        } else {
            // If on homepage, just update params
            handleGenreSelection(genre)
        }
    }

    return (
        <Show above="md">
            <Box w="200px">
                <GenreList onClick={onGenreClick} />
            </Box>
        </Show>
    )
}

export default Sidebar
