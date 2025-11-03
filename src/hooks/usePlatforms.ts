import PlatformService, { PlatformResponse } from '../services/PlatformService'
import useCollection from './useCollection'

const useGenres = () => {
    const { data: platforms, error } =
        useCollection<PlatformResponse>(PlatformService)
    return { platforms, error }
}

export default useGenres
