import React, { useState, useEffect } from 'react'
import { Item } from './Item'

export const Cart = () => {
    const [cart, setCart] = useState([]);

    const getCart = async() => {
        try {
            const res = await fetchCart();
            setCart(res);
        } catch(error) {
            console.error('FAILED TO GET CART', error);
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    return (
        <div>
            <h1>Cart</h1>
            {cart.map((item) => (
                <Item key={item.itemId} data={item} />
            ))}
        </div>
    )
}