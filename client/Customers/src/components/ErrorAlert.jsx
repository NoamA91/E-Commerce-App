import { PropTypes } from 'prop-types'
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

ErrorAlert.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired
}