import { CanceledError } from '../services/ApiClient'
import { useEffect, useState } from 'react'
import GenreService, { GenreResponse } from '../services/GenreService'
import { Link, UnorderedList, ListItem } from '@chakra-ui/react'

interface Props {
    onClick: (id: number) => void
}

const GenreList = ({ onClick }: Props) => {
    const [genres, setGenres] = useState<GenreResponse>()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const { response, cancel } = GenreService.getAll<GenreResponse>()
        response
            .then((res) => setGenres(res.data))
            .catch((err) => {
                if (err instanceof CanceledError) return
                setErrorMessage('Could not get genres')
            })
        return () => cancel()
    }, [])

    return (
        <>
            <h2>GenreList</h2>
            <UnorderedList>
                {genres?.results.map((genre, index) => (
                    <ListItem key={index}>
                        <Link onClick={() => onClick(genre.id)}>
                            {genre.name}
                        </Link>
                    </ListItem>
                ))}
            </UnorderedList>

            {errorMessage && <p>{errorMessage}</p>}
        </>
    )
}

export default GenreList
