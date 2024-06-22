import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';

export const EditProduct = () => {
    const location = useLocation();
    const id = location.state.id;
    const [productData, setProductData] = useState({
        itemId: id,
        boughtInLastMonth: 0,
        imgUrl: '',
        isBestSeller: false,
        price: 0.0,
        stars: 0,
        title: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await putItem(productData);
        } catch(error) {
            console.error('FAILED TO POST PROD', error);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='itemId'>Item ID</label>
      <br/>
      <input 
          id='itemId'
          type='text'
          onChange={(e)=>setProductData({...productData, itemId:e.target.value})}
          required>
      </input>
      <br/>

      <label htmlFor='boughtInLastMonth'>Bought in Last Month</label>
      <br/>
      <input 
          id='boughtInLastMonth'
          type='number'
          onChange={(e)=>setProductData({...productData, boughtInLastMonth:parseInt(e.target.value)})}
          required>
      </input>
      <br/>

      <label htmlFor='imgUrl'>Image URL</label>
      <br/>
      <input 
          id='imgUrl'
          type='text'
          onChange={(e)=>setProductData({...productData, imgUrl:e.target.value})}
          required>
      </input>
      <br/>

      <label htmlFor='isBestSeller'>Is Best Seller</label>
      <br/>
      <input 
          id='isBestSeller'
          type='checkbox'
          onChange={(e)=>setProductData({...productData, isBestSeller:e.target.checked})}
          required>
      </input>
      <br/>

      <label htmlFor='price'>Price</label>
      <br/>
      <input 
          id='price'
          type='number'
          step='0.01'
          onChange={(e)=>setProductData({...productData, price:parseFloat(e.target.value)})}
          required>
      </input>
      <br/>

      <label htmlFor='stars'>Stars</label>
      <br/>
      <input 
          id='stars'
          type='number'
          min='0'
          max='5'
          onChange={(e)=>setProductData({...productData, stars:parseInt(e.target.value)})}
          required>
      </input>
      <br/>

      <label htmlFor='title'>Title</label>
      <br/>
      <input 
          id='title'
          type='text'
          onChange={(e)=>setProductData({...productData, title:e.target.value})}
          required>
      </input>
      <br/>

      <button type='submit'>Submit</button>
    </form>
  )
}