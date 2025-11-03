import { useQuery } from '@tanstack/react-query'
import PlatformService, { PlatformResponse } from '../services/PlatformService'

const usePlatforms = () => {
    const { data: platforms, error } = useQuery<PlatformResponse>({
        queryKey: ['platforms'],
        queryFn: async () => {
            const { response } = PlatformService.getAll<PlatformResponse>()
            return (await response).data
        },
    })
    return { platforms, error }
}

export default usePlatforms
