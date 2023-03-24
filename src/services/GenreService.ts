import HttpService, { RawGResponse } from './HttpService'

export interface Genre {
    name: string
}

export interface GenreResponse extends RawGResponse<Genre> {}

export default new HttpService('/genres')
