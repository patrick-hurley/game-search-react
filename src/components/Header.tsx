import { Flex, Image, Box } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import SearchBar from './SearchBar'
import LightDarkToggle from './LightDarkToggle'
import { useGamesFilterParams } from '../hooks/useGamesFilterParams'

const Header = () => {
    const { handleSearch } = useGamesFilterParams()
    const navigate = useNavigate()
    const location = useLocation()

    const onSearch = (searchText: string) => {
        handleSearch(searchText)
        // Only navigate if not already on homepage
        if (location.pathname !== '/') {
            navigate('/')
        }
    }

    return (
        <Flex justify="space-between" align="center">
            <Image src={logo} w="60px" mr="25px" />
            <Box flex="1">
                <SearchBar onSearch={onSearch} />
            </Box>
            <LightDarkToggle />
        </Flex>
    )
}

export default Header
