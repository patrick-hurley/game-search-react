import { Box } from '@chakra-ui/react'

const GameRating = ({ rating }: { rating: number }) => {
    return (
        <Box
            border="2px solid green"
            display="inline-block"
            padding="1px 5px"
            borderRadius="5px"
            alignSelf="start"
            fontSize="11px"
        >
            {rating ? rating : '0'}
        </Box>
    )
}

export default GameRating
