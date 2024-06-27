import React from 'react'

const TableData = ({ productos }) => {


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
                                onClick={() => {
                                    // useDelete(item.id);
                                    // setActualizarTabla((prev) => !prev);
                                }}
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