import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <motion.div
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'red'
            }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 0.4,
                    delayChildren: 0.3,
                    staggerChildren: 0.2
                }
            }}
            exit={{ opacity: 0 }}
        >
            <div>Contact</div>
        </motion.div>
    )
}

export default Contact