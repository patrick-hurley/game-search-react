import { Select } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { CanceledError } from '../services/ApiClient'
import PlatformService, { PlatformResponse } from '../services/PlatformService'

interface Props {
    onPlatformSelect: (platform: string | undefined) => void
}

const PlatformFilter = ({ onPlatformSelect }: Props) => {
    const [platforms, setPlatforms] = useState<PlatformResponse>()

    useEffect(() => {
        const { response, cancel } = PlatformService.getAll<PlatformResponse>()
        response
            .then((res) => {
                setPlatforms(res.data)
            })
            .catch((err) => {
                if (err instanceof CanceledError) return
                console.log('Could not get platforms')
            })
        return () => cancel()
    }, [])

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
