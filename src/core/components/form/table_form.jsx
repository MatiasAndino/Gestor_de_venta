import React, { useRef } from 'react'
import TableData from './table_data';
import AdministradorAlertas from '../alerts/administrador_alertas';

const TableForm = () => {

    
    return (
        <>
            <div className="table-responsive border" style={{ maxHeight: '60vh' }} >

                <TableData />

            </div>
        </>
    )
}

export default TableForm