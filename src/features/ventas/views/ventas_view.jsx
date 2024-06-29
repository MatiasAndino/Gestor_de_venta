import React from 'react';
import TableDataVentas from '../../../core/components/form/ventas/table_data_ventas';

const VentasView = () => {
  return (
    <div className="d-flex vh-100">
      <div className="container bg-custom-opacity text-light" >
        <h2 className='text-center p-3'><strong>VENTAS</strong></h2>
        <TableDataVentas />
      </div>
    </div>
  )
};

export default VentasView;