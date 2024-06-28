import React from 'react'

const Input = ({ titulo, ...props }) => {

    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">  {titulo} </label>
            <input
                {...props}
                className="form-control p-2"
                id={props.name}
            />
        </div>
    )
}

export default Input