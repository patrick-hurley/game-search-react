import { KeyboardEvent } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useForm, FieldValues } from 'react-hook-form'

interface Props {
    onSearch: (searchText: string) => void
}

const SearchBar = ({ onSearch }: Props) => {
    const { register, handleSubmit, reset } = useForm<{ search: string }>()

    const handleUserKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(onSubmit)()
        }
    }

    const onSubmit = (data: FieldValues) => {
        onSearch(data.search)
        reset()
    }

    return (
        <>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<AiOutlineSearch color="gray.300" />}
                        />
                        <Input
                            {...register('search', {
                                required: true,
                            })}
                            type="text"
                            placeholder="search"
                            borderRadius="20px"
                            onKeyPress={handleUserKeyPress}
                        />
                    </InputGroup>
                </form>
            </Box>
        </>
    )
}

export default SearchBar
