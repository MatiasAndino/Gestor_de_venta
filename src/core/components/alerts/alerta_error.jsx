import React from 'react'

const AlertaError = ({ message }) => {
    return (
        <div className={`alert alert-danger alert-dismissible fade show text-center fixed-top horizontal-shake`} role="alert">
            <strong className="mx-2">Error!</strong> { message }
        </div>
    )
}

export default AlertaError