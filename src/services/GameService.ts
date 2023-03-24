import HttpService, { RawGResponse } from './HttpService'

export interface Game {
    id: number
    name: string
    released: string
    background_image: string
}

export interface GameResponse extends RawGResponse<Game> {}

export default new HttpService('/games')
