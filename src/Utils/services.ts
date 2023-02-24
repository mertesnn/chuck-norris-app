import axios from 'axios'

export const getRandomJoke = async (category: string | undefined) => {
    const { data }: { data: joke } = await axios.get(
        `https://api.chucknorris.io/jokes/random${
            category ? '?category=' + category : ''
        }`
    )
    return data
}
