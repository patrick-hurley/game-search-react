import { Text, Select } from '@chakra-ui/react'
import { useRef } from 'react'
import usePlatforms from '../hooks/usePlatforms'

interface Props {
    onPlatformSelect: (platform: string | null) => void
}

const PlatformFilter = ({ onPlatformSelect }: Props) => {
    const { platforms, error } = usePlatforms()
    const platformRef = useRef<HTMLSelectElement>(null)
    return !error ? (
        <Select
            ref={platformRef}
            w={{ base: '100%', md: '250px' }}
            onChange={() => onPlatformSelect(platformRef.current?.value!)}
        >
            <option key="all" value="all">
                -- All Platforms --
            </option>
            {platforms?.results.map((platform) => (
                <option key={platform.id} value={platform.id}>
                    {platform.name}
                </option>
            ))}
        </Select>
    ) : (
        <Text>Could not get platforms</Text>
    )
}

export default PlatformFilter
