import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postProduct } from './auth/crearproducto'; 

const CrearProducto = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    boughtInLastMonth: 0,
    imgUrl: '',
    isBestSeller: false,
    price: 0.0,
    stars: 0,
    title: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postProduct(formData); 
      console.log('Producto creado:', response);

      history.push('/'); 
    } catch (error) {
      console.error('Error al crear el producto:', error);

    }
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Puntuación:</label>
          <input type="number" name="stars" value={formData.stars} onChange={handleChange} required />
        </div>
        <div>
          <label>Compras en el último mes:</label>
          <input type="number" name="boughtInLastMonth" value={formData.boughtInLastMonth} onChange={handleChange} required />
        </div>
        <div>
          <label>URL de la imagen:</label>
          <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} required />
        </div>
        <div>
          <label>¿Es bestseller?</label>
          <input type="checkbox" name="isBestSeller" checked={formData.isBestSeller} onChange={() => setFormData(prevState => ({ ...prevState, isBestSeller: !prevState.isBestSeller }))} />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CrearProducto;
