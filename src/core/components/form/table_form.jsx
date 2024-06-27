import React, { useEffect, useState } from 'react'
import { useProductos } from '../../hooks/useProductos';
import TableData from './table_data';

const TableForm = () => {
    const { productos } = useProductos();

    return (
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DESCRIPCION</th>
                    <th>PRECIO</th>
                    <th>CATEGORIA</th>
                    <th>PROVEEDOR</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <TableData productos={productos} />

        </table>
    )
}

export default TableForm