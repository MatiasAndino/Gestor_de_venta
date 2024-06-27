
const AlertaSuccessful = ({ message }) => {

    return (
        <div className={`alert alert-success alert-dismissible fade show text-center fixed-top horizontal-shake`} role="alert">
            <strong className="mx-2">Felicidades!</strong> { message }
        </div>
    )
};

export default AlertaSuccessful;