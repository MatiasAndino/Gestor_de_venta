import React from 'react'

const TableHead = ({ datos }) => {
    console.log()
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