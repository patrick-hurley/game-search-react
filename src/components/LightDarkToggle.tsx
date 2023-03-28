import {
    FormControl,
    FormLabel,
    Show,
    Switch,
    useColorMode,
} from '@chakra-ui/react'

const LightDarkToggle = () => {
    const { toggleColorMode, colorMode } = useColorMode()

    return (
        <FormControl
            w={{ base: '30px', md: '147px' }}
            ml="30px"
            display="flex"
            alignItems="center"
        >
            <Switch
                onChange={toggleColorMode}
                mr="20px"
                isChecked={colorMode === 'dark'}
            />
            <Show above="md">
                <FormLabel mb="0">Dark Mode</FormLabel>
            </Show>
        </FormControl>
    )
}

export default LightDarkToggle
