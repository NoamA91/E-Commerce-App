import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Login = () => {
    return (
        <Box
            as={motion.div}
            style={{ minHeight: "100vh", width: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >

        </Box>
    )
}

export default Login