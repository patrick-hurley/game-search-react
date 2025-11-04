import { Box } from '@chakra-ui/react'

interface Props {
    rating?: number
    size?: 'sm' | 'lg'
}

const GameRating = ({ rating, size = 'sm' }: Props) => {
    if (!rating) return null

    const sizeStyles = {
        sm: {
            padding: '1px 5px',
            fontSize: '11px',
            borderWidth: '2px',
        },
        lg: {
            padding: '4px 10px',
            fontSize: '16px',
            borderWidth: '3px',
        },
    }

    const styles = sizeStyles[size]

    return (
        <Box
            border={`${styles.borderWidth} solid green`}
            display="inline-block"
            padding={styles.padding}
            borderRadius="5px"
            alignSelf="start"
            fontSize={styles.fontSize}
        >
            {rating}
        </Box>
    )
}

export default GameRating
