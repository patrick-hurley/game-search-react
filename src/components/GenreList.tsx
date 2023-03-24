import { CanceledError } from '../services/ApiClient'
import { useEffect, useState } from 'react'
import GenreService, { GenreResponse } from '../services/GenreService'
import { Box, Flex, Image, Link, VStack } from '@chakra-ui/react'

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
            {genres?.results.map((genre, index) => (
                <VStack align="left" key={index}>
                    <Flex mb="5">
                        <Image
                            h="32px"
                            w="32px"
                            mr="2"
                            borderRadius="10px"
                            objectFit="cover"
                            src={genre.image_background}
                        />

                        <Link key={index} onClick={() => onClick(genre.id)}>
                            {genre.name}
                        </Link>
                    </Flex>
                </VStack>
            ))}

            {errorMessage && <p>{errorMessage}</p>}
        </>
    )
}

export default GenreList
