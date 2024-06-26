import React from 'react';
import TablaProductos from '../../../core/components/table/tabla_productos';

const ProductosView = () => {
  return (
    <div className="d-flex vh-100">
      <div className="container bg-custom-opacity text-light" >
        <h2 className='text-center mb-5'>PRODUCTOS</h2>
          <TablaProductos />
      </div>
    </div>
  )
};

export default ProductosView;