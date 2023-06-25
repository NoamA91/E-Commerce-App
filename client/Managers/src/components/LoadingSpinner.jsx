import { Flex, Spinner } from "@chakra-ui/react"

const LoadingSpinner = () => {
    return (
        <Flex
            w='100%'
            h='100vh'
            justifyContent='center'
            alignItems='center'
        >
            <Spinner size='xl' />
        </Flex>
    )
}

export default LoadingSpinner