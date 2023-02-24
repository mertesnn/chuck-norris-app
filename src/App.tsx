import { Center, VStack, Text, Button, Select, HStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import bg from './Images/bg.webp'
import { getRandomJoke } from './Utils/services'
import useFetch from './Utils/useFetch'

const App = () => {
    const selectedCategory = useRef<HTMLSelectElement>(null)
    const [buttonText, setButtonText] = useState<string | undefined>(
        'Random Joke'
    )
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
        const category =
            selectedCategory?.current?.value !== '0'
                ? selectedCategory?.current?.value
                : ''
        const data: joke | undefined = await getRandomJoke(category)
        setJokes(data)
    }

    const handleSelect = () => {
        setButtonText(
            `Random ${
                selectedCategory?.current?.value !== '0'
                    ? selectedCategory?.current?.value
                    : ''
            } Joke`
        )
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
                        <Select
                            w="100%"
                            color="orange"
                            borderColor="orange"
                            ref={selectedCategory}
                            onChange={handleSelect}
                            textTransform="capitalize"
                        >
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
                            textTransform="capitalize"
                        >
                            {buttonText}
                        </Button>
                    </HStack>
                </VStack>
            </Center>
        </>
    )
}

export default App
