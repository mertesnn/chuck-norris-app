import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useFetch(url: string) {
    const [joke, setjoke] = useState(undefined)

    useEffect(() => {
        const getJoke = async () => {
            const { data } = await axios.get(url)
            setjoke(data)
        }

        getJoke()
    }, [url])

    return joke
}
