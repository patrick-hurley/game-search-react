import HttpService from '../services/HttpService'
import useData from './useData'

const useResource = <T>(service: HttpService, id: string, deps?: any[]) => {
    return useData<T>(() => service.getById<T>(id), deps)
}

export default useResource
