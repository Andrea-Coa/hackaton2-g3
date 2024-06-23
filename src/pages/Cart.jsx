import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function Cart({ userId }) {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [newItemId, setNewItemId] = useState('');

    const fetchCart = async () => {
        try {
            const response = await axios.get(`/cart/${userId}`);
            setCart(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch cart');
        }
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/cart', { itemId: newItemId, userId });
            setSuccessMessage('Item added to cart successfully.');
            setNewItemId('');
            fetchCart();
        } catch (err) {
            setError(err.message || 'Failed to add item to cart');
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete('/cart', {
                data: { itemId, userId }
            });
            setSuccessMessage('Item removed from cart successfully.');
            fetchCart();
        } catch (err) {
            setError(err.message || 'Failed to remove item from cart');
        }
    };

    const handlePurchase = async () => {
        try {
            const response = await axios.post('/buy', { userId });
            setSuccessMessage(response.data.message);
            setCart([]);
        } catch (err) {
            setError(err.message || 'Failed to purchase cart');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <div>Your cart is empty</div>
            ) : (
                cart.map((item) => (
                    <div key={item.itemId}>
                        <h3>{item.title}</h3>
                        <p>Quantity: {item.qty}</p>
                        <button onClick={() => handleRemoveItem(item.itemId)}>Remove</button>
                    </div>
                ))
            )}
            {cart.length > 0 && <button onClick={handlePurchase}>Purchase</button>}

            <form onSubmit={handleAddItem}>
                <h3>Add Item to Cart</h3>
                <input
                    type="text"
                    value={newItemId}
                    onChange={(e) => setNewItemId(e.target.value)}
                    placeholder="Item ID"
                    required
                />
                <button type="submit">Add Item</button>
            </form>

            {successMessage && <div>{successMessage}</div>}
        </div>
    );
}

Cart.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default Cart;
