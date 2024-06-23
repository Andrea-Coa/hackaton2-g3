import { useState, useEffect, useRef, useCallback } from 'react';

const API_URL = "https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loader = useRef(null);

    const fetchProducts = async (lastKey) => {
        if (loading || lastKey === null && products.length > 0) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/items?limit=10${lastKey ? `&lastKey=${lastKey}` : ''}`);
            if (!response.ok) {
                throw new Error('Error fetching products');
            }
            const data = await response.json();
            setProducts((prev) => [...prev, ...data.items]);
            setLastKey(data.lastKey || null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(null);
    }, []);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && lastKey !== null) {
            fetchProducts(lastKey);
        }
    }, [loading, lastKey]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [handleObserver]);

    return (
        <div>
            <div className="product-list">
                {products.map((product, index) => (
                    <div key={index} className="product-item">
                        <button>
                            <img
                                src={product.imgUrl}
                                alt={product.title}
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    backgroundColor: 'lightgray',
                                    borderRadius: 10,
                                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', // Sombra
                                }}
                            />
                        </button>
                        <br/>
                        <button>
                            <h2>{product.title}</h2>
                        </button>
                        <p>Precio: S/.{product.price}</p>
                        <p>Puntuación: {product.stars}</p>
                        <button> Añadir al carrito</button>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div ref={loader}/>
        </div>
    );
};

export default ProductList;
