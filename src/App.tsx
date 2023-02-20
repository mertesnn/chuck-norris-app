import { Center, VStack, Text, Button, Select, HStack } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import bg from './Images/bg.webp'

const App = () => {
    const [joke, setJoke] = useState<joke | null>(null)

    const handleClick = async () => {
        const data = await axios.get('https://api.chucknorris.io/jokes/random')
        setJoke(data?.data)
    }

    useEffect(() => {
        console.log(joke?.value)
    }, [joke])

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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deserunt, recusandae!
                    </Text>
                    <HStack gap="30px">
                        <Select w="100%">
                            <option value="0">Choose Category</option>
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
