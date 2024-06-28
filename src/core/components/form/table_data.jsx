import React, { useEffect, useRef, useState } from 'react'
import { useProductos } from '../../hooks/useProductos';
import UpdateForm from './update_form';
import useCategorias from '../../hooks/useCategorias';
import Modal from '../modal/modal';
import TableHead from './table_head';
import useProveedores from '../../hooks/useProveedores';
import AdministradorAlertas from '../alerts/administrador_alertas';

const TableData = () => {
    const { productos, deleteProducto, updateProducto } = useProductos();
    const { categorias, isLoading: categoriasLoading } = useCategorias();
    const { proveedores, isLoading: proveedoresLoading } = useProveedores();

    const [selectedItem, setSelectedItem] = useState(0);

    const administradorAlertasRef = useRef();

    function mostrarAlerta(text, type) {
        administradorAlertasRef.current.showMessage(text, type);
    }


    async function eliminarProducto(event, id) {
        event.preventDefault();
        try {
            const {text, type} = await deleteProducto(id);
            mostrarAlerta(text, type);
        } catch (error) {
            console.log('TableData-eliminarProducto', error)
        }
    }

    return (
        <>
            <table className="table table-striped table-dark">
                <TableHead datos={['ID', 'PRODUCTO', 'DESCRIPCIÓN', 'PRECIO', 'CATEGORIA', 'PROVEEDOR', 'DEL', 'UPD']} />
                <tbody>
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
                                        className="btn btn-danger"
                                        onClick={(event) => eliminarProducto(event, item.id)}
                                    >
                                        ELIMINAR
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        data-bs-toggle="modal"
                                        data-bs-target='#modalUpdate'
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        ACTUALIZAR
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                !categoriasLoading && !proveedoresLoading && <Modal
                    mostrarAlerta={mostrarAlerta}
                    selectedItem={selectedItem}
                    categorias={categorias}
                    proveedores={proveedores}
                    updateProducto={updateProducto}
                />
            }
            <AdministradorAlertas ref={administradorAlertasRef} />

            {/* <Modal selectedItem={selectedItem} optionCategorias={optionCategorias} /> */}
        </>
    )
}

export default TableData
