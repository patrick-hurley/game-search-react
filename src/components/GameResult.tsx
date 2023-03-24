import { Box, Heading } from '@chakra-ui/react'
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
            <Heading as="h2" size="md" mb={5}>
                {name}
            </Heading>
            <img src={backgroundImage} /> {/*<p>{platforms}</p> */}
            {platforms?.map((platform, index) => (
                <p key={index}>{platform.platform.name}</p>
            ))}
            <p>Rating: {rating}</p>
        </Box>
    )
}

export default GameResult
