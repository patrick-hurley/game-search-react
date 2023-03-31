import { Flex, Heading, Image, Link, Text } from '@chakra-ui/react'
import useGenres from '../hooks/useGenres'
import { Genre } from '../services/GenreService'
import imageUrl from '../utils/imageUrl'

interface Props {
    onClick: (genre: Genre) => void
}

const GenreList = ({ onClick }: Props) => {
    const { genres, error } = useGenres()

    if (error) return <Text>Could not get genres</Text>

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
        </>
    )
}

export default GenreList
