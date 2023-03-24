import { Box, Heading, Image } from '@chakra-ui/react'
import { Platform } from '../services/GameService'

interface Props {
    backgroundImage?: string
    name: string
    platforms: Platform[]
    rating: number
}

const GameResult = ({ name, backgroundImage, platforms, rating }: Props) => {
    return (
        <Box>
            <Image src={backgroundImage} mb="3" />
            <Heading as="h2" size="md" mb={5}>
                {name}
            </Heading>
            {platforms?.map((platform, index) => (
                <p key={index}>{platform.platform.name}</p>
            ))}
            <p>Rating: {rating}</p>
        </Box>
    )
}

export default GameResult
