import { Box } from '@chakra-ui/react'
import imageUrl from '../utils/imageUrl'

const GameImage = ({ image }: { image: string }) => {
    return (
        <Box
            h={{ base: '250px', md: '150px' }}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundImage={imageUrl(image)}
        >
            {!image && 'no image'}
        </Box>
    )
}

export default GameImage
