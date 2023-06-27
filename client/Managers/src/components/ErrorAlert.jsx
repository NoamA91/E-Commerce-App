import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorAlert = ({ error }) => {
    return (
        <Alert status='error'>
            <AlertIcon />
            {error.message}
        </Alert>
    )
}

export default ErrorAlert