import React, { useState, useEffect } from 'react'

export const Item = ({data}) => {
    const [product, setProduct] = useState(null);
    const { itemId, qty } = data;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${itemId}`);
                const productData = await response.json();
                setProduct(productData);
            } catch (error) {
                console.error('Failed to fetch product', error);
            }
        };

        fetchProduct();
    }, [itemId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{product.title}</h2>
            <p>Price: {product.price}</p>
            <p>Quantity: {qty}</p>
        </div>
    )
}