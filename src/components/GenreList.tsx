import { Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CanceledError } from '../services/ApiClient'
import GenreService, { Genre, GenreResponse } from '../services/GenreService'
import imageUrl from '../utils/imageUrl'

interface Props {
    onClick: (genre: Genre) => void
}

const GenreList = ({ onClick }: Props) => {
    const [genres, setGenres] = useState<GenreResponse>()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const { response, cancel } = GenreService.getAll<GenreResponse>()
        response
            .then((res) => {
                setGenres(res.data)
                setErrorMessage('')
            })
            .catch((err) => {
                if (err instanceof CanceledError) return
                setErrorMessage('Could not get genres')
            })
        return () => cancel()
    }, [])

    return (
        <>
            <Heading as="h2" size="md" mb="35px" mt="10px">
                Genres
            </Heading>
            {genres?.results.map((genre, index) => (
                <Flex mb="5" key={index}>
                    <Image
                        h="32px"
                        w="32px"
                        mr="2"
                        borderRadius="10px"
                        objectFit="cover"
                        src={imageUrl(genre.image_background)}
                    />

                    <Link key={index} onClick={() => onClick(genre)}>
                        {genre.name}
                    </Link>
                </Flex>
            ))}
            {errorMessage && <Text>{errorMessage}</Text>}
        </>
    )
}

export default GenreList
