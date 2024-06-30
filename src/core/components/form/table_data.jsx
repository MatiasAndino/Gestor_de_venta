import React, { useRef, useState } from 'react'
import { useProductos } from '../../hooks/useProductos';
import ModalActualizarProducto from '../modal/modal_actualizar_producto';
import TableHead from './table_head';
import AdministradorAlertas from '../alerts/administrador_alertas';
import ModalCrearProducto from '../modal/modal_crear_producto';

import editImage from '../../../assets/icons/pencil-square.svg'
import deleteImage from '../../../assets/icons/file-earmark-x.svg'
import newImage from '../../../assets/icons/file-earmark-plus.svg'

const TableData = () => {
    const { productos, deleteProducto, updateProducto, createProducto } = useProductos();

    const [selectedItem, setSelectedItem] = useState({
        id: 0,
        nombre: '',
        descripcion: '',
        precio: 0,
        categoriaId: 1,
        proveedorId: 1
    });

    const administradorAlertasRef = useRef();

    function mostrarAlerta(text, type) {
        administradorAlertasRef.current.showMessage(text, type);
    }


    async function handleEliminarProducto(event, id) {
        event.preventDefault();
        try {
            const { text, type } = await deleteProducto(id);
            mostrarAlerta(text, type);
        } catch (error) {
            console.log('TableData-eliminarProducto', error)
        }
    }

    return (
        <>
            <div className="overflow-auto table-responsive h-table border border-secondary border-3 bg-dark">

                <table className="table table-striped table-dark">
                    <TableHead datos={['ID', 'PRODUCTO', 'DESCRIPCIÓN', 'PRECIO', 'CATEGORIA', 'PROVEEDOR', '']} />
                    <tbody className='table-responsive align-middle'>
                        {
                            productos.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.nombre}
                                    </td>
                                    <td>
                                        {item.descripcion}
                                    </td>
                                    <td>
                                        {item.precio}
                                    </td>
                                    <td>
                                        {item.categoriaId}
                                    </td>
                                    <td>
                                        {item.proveedorId}
                                    </td>
                                    <td>
                                        <button
                                            className='btn btn-success btn-sm mx-1'
                                            data-bs-toggle="modal"
                                            data-bs-target='#modalUpdate'
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <img src={editImage} alt="actualizar" width="24" height="24" style={{ filter: 'invert(100%)' }} />
                                        </button>
                                        <button
                                            className='btn btn-danger btn-sm mx-1'
                                            type="button"
                                            onClick={(event) => handleEliminarProducto(event, item.id)}
                                        >
                                            <img src={deleteImage} alt="delete" width="24" height="24" style={{ filter: 'invert(100%)' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <ModalActualizarProducto
                    mostrarAlerta={mostrarAlerta}
                    selectedItem={selectedItem}
                    updateProducto={updateProducto}
                />

            </div>
            <button className='btn btn-primary mt-2 ' data-bs-toggle="modal" data-bs-target='#modalCreate'>
                {/* <div className='align-items-end text-center' style={{height: '30px'}}> */}

                    <img src={newImage} alt="Nuevo-Producto" width="24" height="24" style={{ filter: 'invert(100%)' }} />
                    <span className='align-middle p-1'>Nuevo Producto </span>
                {/* </div> */}
            </button>
            <ModalCrearProducto
                mostrarAlerta={mostrarAlerta}
                createProducto={createProducto}
            />

            <AdministradorAlertas ref={administradorAlertasRef} />
        </>
    )
}

export default TableData
