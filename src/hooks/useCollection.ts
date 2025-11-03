import HttpService from '../services/HttpService'
import useData from './useData'

const useCollection = <T>(service: HttpService, params?: {}, deps?: any[]) => {
    return useData<T>(() => service.getAll<T>(params), deps)
}

export default useCollection
