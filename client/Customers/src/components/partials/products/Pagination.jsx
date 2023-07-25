import { Box, ButtonGroup, Button, Text } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, productsPerPage, totalProducts, onPageChange }) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handleClick = (page) => {
        onPageChange(page);
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 0);
    };

    return (
        <Box my={5}>
            <ButtonGroup spacing={2}>
                <Button
                    colorScheme="teal"
                    isDisabled={currentPage === 1}
                    onClick={() => handleClick(currentPage - 1)}
                >
                    <ChevronLeftIcon boxSize='6' />
                </Button>
                <Button
                    colorScheme="teal"
                    isDisabled={currentPage === totalPages}
                    onClick={() => handleClick(currentPage + 1)}
                >
                    <ChevronRightIcon boxSize='6' />
                </Button>
            </ButtonGroup>
            <Text mt={2}>
                Page {currentPage} of {totalPages}
            </Text>
        </Box>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    productsPerPage: PropTypes.number.isRequired,
    totalProducts: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
