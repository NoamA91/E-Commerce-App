import { motion } from 'framer-motion';

const Products = () => {
    return (
        <motion.div
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: 'green'
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
            <div>Products</div>
        </motion.div>
    )
}

export default Products