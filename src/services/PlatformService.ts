import HttpService, { RawGResponse } from './HttpService'

export interface Platform {
    id: number
    name: string
}

export interface PlatformResponse extends RawGResponse<Platform> {}

export default new HttpService('/platforms')
