import ApiClient from './ApiClient'

export interface RawGResponse<T> {
    count: number
    next: string
    previous: string
    results: T[]
}

class HttpService {
    constructor(private path: string) {}

    getAll<T>(params: {} = {}) {
        const controller = new AbortController()
        const response = ApiClient.get<T>(this.path, {
            signal: controller.signal,
            params: { ...params, page: 1, page_size: 12 },
        })
        return { response, cancel: () => controller.abort() }
    }
}

export default HttpService
