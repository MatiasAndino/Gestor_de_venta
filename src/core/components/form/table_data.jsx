import React from 'react'
import { useProductos } from '../../hooks/useProductos';

const TableData = ({ mostrarAlerta }) => {
    const { productos, deleteProducto } = useProductos();

    async function eliminarProducto(event, id) {
        event.preventDefault();
        try {
            const deleteMessage = await deleteProducto(id);
            mostrarAlerta(deleteMessage, 'successful');
        } catch (error) {
            console.log('TableData-eliminarProducto', error)
        }
    }

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
                            >ELIMINAR</button>
                        </td>
                        <td>
                            {/* <Actualizar
                                item={item}
                            /> */}
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}

export default TableData