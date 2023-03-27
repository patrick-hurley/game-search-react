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
        <FormControl w="127px" ml="30px" display="flex" alignItems="center">
            <FormLabel mb="0">Dark Mode</FormLabel>
            <Switch onChange={toggleColorMode} />
        </FormControl>
    )
}

export default LightDarkToggle
