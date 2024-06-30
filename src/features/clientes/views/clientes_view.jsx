import React from 'react';
import TableDataClientes from '../../../core/components/form/clientes/table_data_clientes';

const ClientesView = () => {
  return (
    <div className="d-flex vh-100">
      <div className="container text-light" >
        <h2 className='text-center bg-dark p-3'><strong>CLIENTES</strong></h2>
        <TableDataClientes />
      </div>
    </div>
  )
};

export default ClientesView;