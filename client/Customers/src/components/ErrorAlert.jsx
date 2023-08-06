import { PropTypes } from 'prop-types'
import { Alert, AlertIcon } from '@chakra-ui/react'

const ErrorAlert = ({ error }) => {
    const errorMessage = error.message;
    const ValidationError = error?.response?.data?.error;

    if (errorMessage?.includes('Validation failed')) {
        return (
            <Alert status='error'>
                <AlertIcon />
                {errorMessage.split(':')[2]?.trim()}
            </Alert>
        );
    }

    if (ValidationError?.includes('Validation failed')) {
        return (
            <Alert status='error'>
                <AlertIcon />
                {ValidationError.split(':')[2]?.trim()}
            </Alert>
        );
    }

    return (
        <Alert status='error'>
            <AlertIcon />
            {errorMessage}
        </Alert>
    );
}


export default ErrorAlert

ErrorAlert.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.object
    ]).isRequired
}