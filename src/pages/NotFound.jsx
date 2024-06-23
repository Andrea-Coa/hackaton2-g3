import React from 'react';
import { useLocation } from 'react-router-dom';

export const NotFound = () => {
  const location = useLocation();

  const handleRedirect = () => {
    window.location.href = '/auth/login';
  };

  return (
    <main>
      <h1 id='notFound' className='text-2xl text-red-600'>404 - Pagina No Encontrada</h1>
      <p>La ruta <span>{location.pathname}</span> no existe.</p>
      <button id='back' onClick={handleRedirect}> Back </button>
    </main>
  );
};