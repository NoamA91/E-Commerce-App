import { Alert, AlertIcon, Box } from '@chakra-ui/react'

const ErrorAlert = ({ error }) => {
    return (
        <Alert status='error'>
            <AlertIcon />
            {error.message}
        </Alert>
    )
}

export default ErrorAlert