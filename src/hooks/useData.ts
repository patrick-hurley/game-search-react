import { useEffect, useState } from 'react'
import { CanceledError } from '../services/ApiClient'
import HttpService from '../services/HttpService'

const useData = <T>(service: HttpService, params?: {}, deps?: any[]) => {
    const [data, setData] = useState<T>()
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(
        () => {
            setIsLoading(true)
            const { response, cancel } = service.getAll<T>(params)
            response
                .then((res) => {
                    setData(res.data)
                    setError(false)
                    setIsLoading(false)
                })
                .catch((err) => {
                    if (err instanceof CanceledError) return
                    setError(true)
                    setIsLoading(false)
                })
            return () => cancel()
        },
        deps ? [...deps] : []
    )

    return { data, error, isLoading }
}

export default useData
