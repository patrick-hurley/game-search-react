import { Heading } from '@chakra-ui/react'
import { GameQuery } from '../services/GameService'

interface Props {
    gameQuery: GameQuery
}

const GameHeading = ({ gameQuery }: Props) => {
    const headingText = gameQuery.searchText
        ? `Search results for '${gameQuery.searchText}'`
        : gameQuery.selectedGenre
        ? `Genre: ${gameQuery.selectedGenre.name}`
        : 'Games'

    return (
        <Heading as="h2" size="xl" mb="20px">
            {headingText}
        </Heading>
    )
}

export default GameHeading
