import PlatformService, { PlatformResponse } from '../services/PlatformService'
import useData from './useData'

const useGenres = () => {
    const { data: platforms, error } =
        useData<PlatformResponse>(PlatformService)
    return { platforms, error }
}

export default useGenres
