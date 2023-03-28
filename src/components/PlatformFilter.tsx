import { Select } from '@chakra-ui/react'
import { useRef } from 'react'
import { PlatformResponse } from '../services/PlatformService'

interface Props {
    platforms: PlatformResponse
    onPlatformSelect: (platform: string | undefined) => void
}

const PlatformFilter = ({ platforms, onPlatformSelect }: Props) => {
    const platformRef = useRef<HTMLSelectElement>(null)
    return (
        <Select
            ref={platformRef}
            w={{ base: '100%', md: '250px' }}
            onChange={() => onPlatformSelect(platformRef.current?.value)}
        >
            <option key="all" value="all">
                -- All Platforms --
            </option>
            {platforms &&
                platforms.results.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                        {platform.name}
                    </option>
                ))}
        </Select>
    )
}

export default PlatformFilter
