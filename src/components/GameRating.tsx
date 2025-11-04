import { Box } from '@chakra-ui/react'

const GameRating = ({ rating }: { rating?: number }) => {
    if (!rating) return null

    return (
        <Box
            border="2px solid green"
            display="inline-block"
            padding="1px 5px"
            borderRadius="5px"
            alignSelf="start"
            fontSize="11px"
        >
            {rating}
        </Box>
    )
}

export default GameRating
