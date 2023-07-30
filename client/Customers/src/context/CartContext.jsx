import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const item = window.localStorage.getItem('cart');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            return [];
        }
    });

    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            // check if product is already in cart
            const isProductInCart = prevCart.find((item) => item._id === product._id);

            // if product is in cart, update quantity
            if (isProductInCart) {
                return prevCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }

            const cartProduct = {
                _id: product._id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity
            };

            return [...prevCart, cartProduct];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const adjustQuantity = (productId, quantity) => {
        setCart((prevCart) => prevCart.map((item) =>
            item._id === productId ? { ...item, quantity } : item
        ));
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        adjustQuantity,
        clearCart
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};