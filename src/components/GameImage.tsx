import { Box, Text } from '@chakra-ui/react'
import imageUrl from '../utils/imageUrl'

const GameImage = ({ image }: { image: string }) => {
    return (
        <Box
            h={{ base: '250px', md: '150px' }}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundImage={imageUrl(image)}
        >
            {!image && (
                <Text p={3} color="gray.500">
                    No image
                </Text>
            )}
        </Box>
    )
}

export default GameImage
