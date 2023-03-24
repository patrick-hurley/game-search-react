import axios, { CanceledError } from 'axios'

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '4dfb373ce981420581bd2bdf914eab20',
    },
})

export { CanceledError }
