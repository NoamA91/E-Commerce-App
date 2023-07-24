import { PropTypes } from 'prop-types'
import { Alert, AlertIcon } from '@chakra-ui/react'

const InfoAlert = ({ message }) => {
    return (
        <Alert status='info'>
            <AlertIcon />
            {message}
        </Alert>
    )
}

InfoAlert.propTypes = {
    message: PropTypes.string.isRequired
}

export default InfoAlert

