import { Center, VStack, Text, Button, Select, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import bg from './Images/bg.webp'
import { getRandomJoke } from './Utils/services'
import useFetch from './Utils/useFetch'

const App = () => {
    const [jokes, setJokes] = useState<joke | undefined>(undefined)
    const [categories, setCategories] = useState<categories | undefined>(
        undefined
    )

    const firstJoke: joke | undefined = useFetch(
        'https://api.chucknorris.io/jokes/random'
    )
    const allCategories: categories | undefined = useFetch(
        'https://api.chucknorris.io/jokes/categories'
    )

    useEffect(() => {
        if (firstJoke) {
            setJokes(firstJoke)
        }
    }, [firstJoke])

    useEffect(() => {
        if (allCategories) {
            setCategories(allCategories)
        }
    }, [allCategories])

    const handleClick = async () => {
        const data: joke | undefined = await getRandomJoke('')
        setJokes(data)
    }

    return (
        <>
            <Center
                w="100%"
                color="#fff"
                h="100vh"
                backgroundImage={bg}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
            >
                <VStack w={{ lg: '60%', md: '65%', sm: '80%' }} gap="40px">
                    <Text fontSize="3xl" align="center">
                        {jokes?.value}
                    </Text>
                    <HStack gap="30px">
                        <Select w="100%" color="orange" borderColor="orange">
                            <option value="0">Choose Category</option>
                            {categories?.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Select>
                        <Button
                            onClick={handleClick}
                            colorScheme="orange"
                            px="35px"
                        >
                            Random Joke
                        </Button>
                    </HStack>
                </VStack>
            </Center>
        </>
    )
}

export default App
