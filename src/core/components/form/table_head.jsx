import React from 'react'

const TableHead = ({ datos }) => {
    return (
        <thead>
            <tr>
                {
                    datos.map(dato => (
                        <th key={dato}>{ dato }</th>
                    ))
                }
            </tr>
        </thead>
    )
}

export default TableHead