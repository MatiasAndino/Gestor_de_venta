import React, { useRef } from 'react'
import TableData from './table_data';
import AdministradorAlertas from '../alerts/administrador_alertas';

const TableForm = () => {

    const administradorAlertasRef = useRef();

    function mostrarAlerta(text, type) {
        administradorAlertasRef.current.showMessage(text, type);
    }

    return (
        <>
            <div className="table-responsive border" style={{ maxHeight: '60vh' }} >

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>DESCRIPCION</th>
                            <th>PRECIO</th>
                            <th>CATEGORIA</th>
                            <th>PROVEEDOR</th>
                            <th>D</th>
                            <th>A</th>
                        </tr>
                    </thead>

                    <TableData mostrarAlerta={mostrarAlerta}/>
                    
                </table>
            </div>
            <div className="btn btn-info mt-3">NUEVO PRODUCTO</div>
            <AdministradorAlertas ref={administradorAlertasRef} />
        </>
    )
}

export default TableForm