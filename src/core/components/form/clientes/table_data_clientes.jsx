import React, { useRef, useState } from 'react'
import TableHead from '../table_head';
import AdministradorAlertas from '../../alerts/administrador_alertas';
import editImage from '../../../../assets/icons/pencil-square.svg'
import deleteImage from '../../../../assets/icons/file-earmark-x.svg'
import newImage from '../../../../assets/icons/file-earmark-plus.svg'
import { useClientes } from '../../../hooks/useClientes';
import ModalActualizarCliente from '../../modal/clientes/modal_actualizar_cliente';
import ModalCrearCliente from '../../modal/clientes/modal_crear_cliente';

const TableDataClientes = () => {
    const { clientes, deleteCliente, updateCliente, createCliente } = useClientes();

    const [selectedItem, setSelectedItem] = useState({
        id: 0,
        nombre: '',
        apellido: '',
        telefono: 0,
    });

    const administradorAlertasRef = useRef();

    function mostrarAlerta(text, type) {
        administradorAlertasRef.current.showMessage(text, type);
    }


    async function handleEliminarCliente(event, id) {
        event.preventDefault();
        try {
            const { text, type } = await deleteCliente(id);
            mostrarAlerta(text, type);
        } catch (error) {
            console.log('TableDataClientes-eliminarCliente', error)
        }
    }

    return (
        <>
            <div className="overflow-auto table-responsive h-table border border-secondary border-3  bg-dark">

                <table className="table table-striped table-dark">
                    <TableHead datos={['ID', 'NOMBRE', 'APELLIDO', 'TELEFONO', '']} />
                    <tbody className='table-responsive align-middle'>
                        {
                            clientes.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.nombre}
                                    </td>
                                    <td>
                                        {item.apellido}
                                    </td>
                                    <td>
                                        {item.telefono}
                                    </td>
                                    <td>
                                        <button
                                            className='btn btn-success btn-sm mx-1'
                                            data-bs-toggle="modal"
                                            data-bs-target='#modalUpdateCliente'
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <img src={editImage} alt="actualizar" width="24" height="24" style={{ filter: 'invert(100%)' }} />
                                        </button>
                                        <button
                                            className='btn btn-danger btn-sm mx-1'
                                            type="button"
                                            onClick={(event) => handleEliminarCliente(event, item.id)}
                                        >
                                            <img src={deleteImage} alt="delete" width="24" height="24" style={{ filter: 'invert(100%)' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <ModalActualizarCliente
                    mostrarAlerta={mostrarAlerta}
                    selectedItem={selectedItem}
                    updateCliente={updateCliente}
                />

            </div>
            <button className='btn btn-primary mt-2 ' data-bs-toggle="modal" data-bs-target='#modalCreateCliente'>
                {/* <div className='align-items-end text-center' style={{height: '30px'}}> */}

                <img src={newImage} alt="Nuevo-Cliente" width="24" height="24" style={{ filter: 'invert(100%)' }} />
                <span className='align-middle p-1'>Nuevo Cliente </span>
                {/* </div> */}
            </button>
            <ModalCrearCliente
                mostrarAlerta={mostrarAlerta}
                createCliente={createCliente}
            />

            <AdministradorAlertas ref={administradorAlertasRef} />
        </>
    )
};

export default TableDataClientes;
