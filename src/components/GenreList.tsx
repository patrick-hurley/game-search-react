import { CanceledError } from '../services/ApiClient'
import { useEffect, useState } from 'react'
import GenreService, { GenreResponse } from '../services/GenreService'

const GenreList = () => {
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
            {genres?.results.map((genre, index) => (
                <p key={index}>{genre.name}</p>
            ))}

            {errorMessage && <p>{errorMessage}</p>}
        </>
    )
}

export default GenreList
