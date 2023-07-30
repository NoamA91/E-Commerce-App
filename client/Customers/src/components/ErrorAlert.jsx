import { PropTypes } from 'prop-types'
import { Alert, AlertIcon } from '@chakra-ui/react'

const ErrorAlert = ({ error }) => {

    if (error.message.includes('validation failed')) {
        return (
            <Alert status='error'>
                <AlertIcon />
                {error.message.split(':')[2].trim()}
            </Alert>
        )
    }

    return (
        <Alert status='error'>
            <AlertIcon />
            {error.message}
        </Alert>
    )
}

export default ErrorAlert

ErrorAlert.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.object
    ]).isRequired
}