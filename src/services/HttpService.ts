import { AxiosResponse } from 'axios'
import ApiClient from './ApiClient'

export interface RawGResponse<T> {
    count: number
    next: string
    previous: string
    results: T[]
}

class HttpService {
    constructor(private path: string) {}

    getAll<T>() {
        const controller = new AbortController()
        const response = ApiClient.get<T>(this.path, {
            signal: controller.signal,
        })
        return { response, cancel: () => controller.abort() }
    }
}

export default HttpService
