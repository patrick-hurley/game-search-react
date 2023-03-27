import {
    Button,
    FormControl,
    FormLabel,
    Switch,
    useColorMode,
} from '@chakra-ui/react'

const LightDarkToggle = () => {
    const { toggleColorMode } = useColorMode()

    return (
        <FormControl w="147px" ml="30px" display="flex" alignItems="center">
            <Switch onChange={toggleColorMode} mr="20px" />
            <FormLabel mb="0">Dark Mode</FormLabel>
        </FormControl>
    )
}

export default LightDarkToggle
