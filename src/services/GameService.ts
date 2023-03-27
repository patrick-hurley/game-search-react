import HttpService, { RawGResponse } from './HttpService'
import { Platform } from '../services/PlatformService'

export interface Game {
    id: number
    name: string
    rating: string
    platforms: iPlatform[]
    background_image: string
}

export interface iPlatform {
    platform: Platform
    released_at: string
}

export interface GameResponse extends RawGResponse<Game> {}

export default new HttpService('/games')
