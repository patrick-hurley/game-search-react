import { Flex, Image, Link } from '@chakra-ui/react'
import { Genre, GenreResponse } from '../services/GenreService'

interface Props {
    genres: GenreResponse
    onClick: (genre: Genre) => void
}

const GenreList = ({ genres, onClick }: Props) => {
    return (
        <>
            {genres?.results.map((genre, index) => (
                <Flex mb="5" key={index}>
                    <Image
                        h="32px"
                        w="32px"
                        mr="2"
                        borderRadius="10px"
                        objectFit="cover"
                        src={genre.image_background}
                    />

                    <Link key={index} onClick={() => onClick(genre)}>
                        {genre.name}
                    </Link>
                </Flex>
            ))}
        </>
    )
}

export default GenreList
