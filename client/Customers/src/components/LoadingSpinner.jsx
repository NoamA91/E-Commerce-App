import { Flex, Spinner } from "@chakra-ui/react"

const LoadingSpinner = () => {
    return (
        <Flex
            w='100%'
            h='100vh'
            bg='gray.100'
            justifyContent='center'
            alignItems='center'
        >
            <Spinner
                thickness='4px'
                speed='0.65s'
                color='teal.500'
                size='xl'
            />
        </Flex>
    )
}

export default LoadingSpinner