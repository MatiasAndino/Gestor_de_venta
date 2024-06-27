import React, { useEffect, useState } from 'react'
import { useProductos } from '../../hooks/useProductos';
import UpdateForm from './update_form';
import useCategorias from '../../hooks/useCategorias';

const TableData = ({ mostrarAlerta }) => {
    const { productos, deleteProducto } = useProductos();
    const { categorias, isLoading: categoriasLoading } = useCategorias();

    const [optionCategorias, setOptionCategorias] = useState([]);

    async function eliminarProducto(event, id) {
        event.preventDefault();
        try {
            const deleteMessage = await deleteProducto(id);
            mostrarAlerta(deleteMessage, 'successful');
        } catch (error) {
            console.log('TableData-eliminarProducto', error)
        }
    }

    useEffect(() => {
        if (categoriasLoading) return;
        const optionCategoriasTemp = categorias.map( ({id, nombre }) => {
            return {
                id,
                value:nombre,
                label:nombre
            }
        })
        setOptionCategorias(optionCategoriasTemp);
    }, [categoriasLoading])

    return (
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

                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target={`#modal-${item.id}`}>
                                ACTUALIZAR
                            </button>
                            <UpdateForm item={ item } optionCategorias={ optionCategorias } />
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}

export default TableData
