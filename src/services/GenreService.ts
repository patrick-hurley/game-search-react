import HttpService, { RawGResponse } from './HttpService'

export interface Genre {
    id: number
    name: string
    image_background: string
}

export interface GenreResponse extends RawGResponse<Genre> {}

export default new HttpService('/genres')
