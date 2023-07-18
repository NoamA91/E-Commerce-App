import { Alert, AlertIcon } from '@chakra-ui/react'

const ErrorAlert = ({ error }) => {
    return (
        <Alert status='error'>
            <AlertIcon />
            {error.message && error.message}
            {error && error}
        </Alert>
    )
}

export default ErrorAlert