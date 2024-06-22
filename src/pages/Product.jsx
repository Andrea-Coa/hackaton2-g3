import React, { useEffect } from 'react'
import { addToCart, deleteProductId, getProductById, getRoleBasedOnToken } from '../service/api';
import {useNavigate} from 'react-router-dom';

export const Product = ({id}) => {
    const [item, setItem] = useState({});
    const role = getRoleBasedOnToken();
    const navigate = useNavigate();
    console.log(item);

    const deleteProduct = async(id) => {
        try {
            await deleteProductId(id);
            console.log('askdhfjlasd');
        } catch(error) {
            console.error('FAILED TO DELETE PROD', error);
        }
    
    }
    const handleEdit = () => {
        console.log('edit');
        // navigate('item/edit', {state : {id:id}});
    }

    const addCart = async() => {
        console.log('add to cart');
        try {
            await addToCart({itemId: id, userId:localStorage.getItem('userId')});
        }
        catch(error) {
            console.error('FAILED TO ADD TO CART', error);
        }
        
    }

    useEffect(() => {
        const fetchProduct = async(id) => {
            try {
                res = await getProductById(id);
                console.log(res);
                setItem(res);
            } catch(error) {
                console.error('FAILED TO FIND PROD', error);
            }
        
        fetchProduct(id);
    } }, []);
    return (

        <div>
            <h1>Product</h1>
            <div className='item-container'>
                <p>{item.title}</p>       
            </div>
            {role=='ROLE_ADMIN' ? <button onClick={() => deleteProduct(item.id)}>Delete</button> : <></>}
            {role=='ROLE_ADMIN' ? <button onClick={handleEdit}>Edit</button> : <></>}
            {role=='ROLE_ADMIN' ? <></>:<button onClick={addCart}>Add to Cart</button>}
            
        </div>
    )
}
