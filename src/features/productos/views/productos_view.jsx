import React from 'react';
import ProductosForm from '../../../core/components/form/productos_form';

const ProductosView = () => {
  return (
    <div className="d-flex vh-100">
      <div className="container text-light" >
        <h2 className='text-center bg-dark p-3'><strong>PRODUCTOS</strong></h2>
        <ProductosForm />
      </div>
    </div>
  )
};

export default ProductosView;