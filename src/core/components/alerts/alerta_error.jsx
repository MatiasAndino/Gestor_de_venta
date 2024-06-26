import React from 'react'

const AlertaError = ({ mensaje }) => {
    return (
        <div className={`alert alert-danger alert-dismissible fade show text-center fixed-top horizontal-shake`} role="alert">
            <strong className="mx-2">Error!</strong> { mensaje }
        </div>
    )
}

export default AlertaError