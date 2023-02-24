import axios from 'axios'

export const getRandomJoke = async (category: string | null) => {
    const { data }: { data: joke } = await axios.get(
        `https://api.chucknorris.io/jokes/random${
            category ?? '?category=' + category
        }`
    )
    return data
}
