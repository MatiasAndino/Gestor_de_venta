import React, { useRef, useState } from 'react'
import editImage from '../../../../assets/icons/pencil-square.svg'
import deleteImage from '../../../../assets/icons/file-earmark-x.svg'
import newImage from '../../../../assets/icons/file-earmark-plus.svg'
import { useVentas } from '../../../hooks/useVentas';
import ModalActualizarVenta from '../../modal/ventas/modal_actualizar_venta';
import ModalCrearVenta from '../../modal/ventas/modal_crear_venta';
import TableHead from '../table_head';
import AdministradorAlertas from '../../alerts/administrador_alertas';

const TableDataVentas = () => {
    const { ventas, deleteVenta, createVenta } = useVentas();

    const [selectedItem, setSelectedItem] = useState({
        id: 0,
        fecha: '',
        cantidad: '',
        total: 0,
        clientesId: 1,
        productoId: 1
    });

    const administradorAlertasRef = useRef();

    function mostrarAlerta(text, type) {
        administradorAlertasRef.current.showMessage(text, type);
    }


    // async function handleEliminarVenta(event, id) {
    //     event.preventDefault();
    //     try {
    //         const { text, type } = await deleteVenta(id);
    //         mostrarAlerta(text, type);
    //     } catch (error) {
    //         console.log('TableDataVentas-eliminarVenta', error)
    //     }
    // }

    return (
        <>
            <div className="overflow-auto table-responsive h-table border border-secondary border-3  bg-dark">

                <table className="table table-striped table-dark">
                    <TableHead datos={['ID', 'FECHA', 'CANTIDAD', 'TOTAL', 'CLIENTE', 'PRODUCTO']} />
                    <tbody className='table-responsive align-middle'>
                        {
                            ventas.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.fecha}
                                    </td>
                                    <td>
                                        {item.cantidad}
                                    </td>
                                    <td>
                                        {item.total}
                                    </td>
                                    <td>
                                        {item.clientesId}
                                    </td>
                                    <td>
                                        {item.productoId}
                                    </td>
                                    {/* <td>
                                         <button
                                            className='btn btn-success btn-sm'
                                            data-bs-toggle="modal"
                                            data-bs-target='#modalUpdateVenta'
                                            onClick={() => setSelectedItem(item)}
                                        >
                                        </button> 
                                        <button
                                            className='btn btn-danger btn-sm ms-2'
                                            type="button"
                                            onClick={(event) => handleEliminarVenta(event, item.id)}
                                        >
                                            <img src={deleteImage} alt="delete" width="24" height="24" style={{ filter: 'invert(100%)' }} />
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/* <ModalActualizarVenta
                    mostrarAlerta={mostrarAlerta}
                    selectedItem={selectedItem}
                    updateVenta={updateVenta}
                /> */}

            </div>
            <button className='btn btn-primary mt-2 ' data-bs-toggle="modal" data-bs-target='#modalCreateVenta'>

                <img src={newImage} alt="Nuevo-Venta" width="24" height="24" style={{ filter: 'invert(100%)' }} />
                <span className='align-middle p-1'>Nueva Venta </span>
            </button>
            <ModalCrearVenta
                mostrarAlerta={mostrarAlerta}
                createVenta={createVenta}
            />

            <AdministradorAlertas ref={administradorAlertasRef} />
        </>
    )
}

export default TableDataVentas
