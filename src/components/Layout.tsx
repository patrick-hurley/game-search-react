import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
    const bg = useColorModeValue('white', '#151515')

    return (
        <Box p={{ base: 5, md: 7 }} bg={bg}>
            <Header />

            <Flex mt="10">
                <Sidebar />

                <Box flex="1">
                    <Outlet />
                </Box>
            </Flex>
        </Box>
    )
}

export default Layout
