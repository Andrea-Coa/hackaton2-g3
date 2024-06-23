import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function ProductDetails({ match }) {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { product_id } = match.params;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/item/${product_id}`);
                setProduct(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch product');
            }
        };

        fetchProduct();
    }, [product_id]);

    const handleUpdate = async () => {
        const updatedProduct = {
            itemId: product_id,
            ...product,
            price: product.price
        };
        try {
            const response = await axios.put('/items', updatedProduct);
            setProduct(response.data);
        } catch (err) {
            setError(err.message || 'Failed to update product');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/item/${product_id}`);
            setSuccessMessage('Product deleted successfully');
            setProduct(null);
        } catch (err) {
            setError(err.message || 'Failed to delete product');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (successMessage) {
        return <div>{successMessage}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <img src={product.imgUrl} alt={product.title} />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

ProductDetails.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            product_id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default ProductDetails;
