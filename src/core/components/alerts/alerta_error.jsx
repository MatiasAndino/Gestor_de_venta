import React from 'react'

const AlertaError = ({ mensaje }) => {
    return (
        <div className={`alert alert-danger alert-dismissible fade show text-center fixed-top horizontal-shake`} role="alert">
            <strong className="mx-2">Error!</strong> { mensaje }
            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setIsNull(false)}></button> */}
        </div>
    )
}

export default AlertaError