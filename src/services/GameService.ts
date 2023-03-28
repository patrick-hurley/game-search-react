import HttpService, { RawGResponse } from './HttpService'
import { Platform } from '../services/PlatformService'

export interface Game {
    id: number
    name: string
    rating: string
    metacritic: number
    platforms: { platform: Platform }[]
    background_image: string
}

export interface GameResponse extends RawGResponse<Game> {}

export default new HttpService('/games')
