import {
    Box,
    Heading,
    Flex,
    useColorModeValue,
    Skeleton,
} from '@chakra-ui/react'
import { IconContext } from 'react-icons'
import { iPlatform } from '../services/GameService'
import { displayConsoleIcon } from '../utils/displayConsoleIcon'

interface Props {
    backgroundImage?: string
    name: string
    platforms: iPlatform[]
    rating: number
    isLoading: boolean
}

const GameResult = ({
    name,
    backgroundImage,
    platforms,
    rating,
    isLoading,
}: Props) => {
    const bg = useColorModeValue('#ececec', '#202020')

    return (
        <Skeleton isLoaded={!isLoading}>
            <Box borderRadius="15px" overflow="hidden" bg={bg}>
                <Box
                    h={{ base: '250px', md: '150px' }}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    backgroundImage={backgroundImage}
                />
                <Box padding="20px 15px">
                    <Flex justify="space-between" align="center">
                        <IconContext.Provider value={{ size: '18px' }}>
                            <Flex wrap="wrap">
                                {platforms?.map((platform) => (
                                    <Box
                                        key={platform.platform.id}
                                        mr={2}
                                        mb={2}
                                    >
                                        {displayConsoleIcon(
                                            platform.platform.name
                                        )}
                                    </Box>
                                ))}
                            </Flex>
                        </IconContext.Provider>
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
                    </Flex>

                    <Heading as="h2" size="md" mt={3}>
                        {name}
                    </Heading>
                </Box>
            </Box>
        </Skeleton>
    )
}

export default GameResult
