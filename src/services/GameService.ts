import HttpService, { RawGResponse } from './HttpService'

export interface Game {
    id: number
    name: string
    rating: string
    platforms: Platform[]
    background_image: string
}

export interface Platform {
    platform: {
        id: number
        name: string
    }
    released_at: string
}

export interface GameResponse extends RawGResponse<Game> {}

export default new HttpService('/games')
