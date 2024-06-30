import { useState } from "react";

const ModalCrearCliente = ({ mostrarAlerta, createCliente }) => {

    const initialValues = {
        nombre: '',
        apellido: '',
        telefono: '',
    }

    const [form, setForm] = useState(initialValues)

    const handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleForm = async event => {
        event.preventDefault();

        try {
            const { text, type } = await createCliente(form);

            mostrarAlerta(text, type);

            defaultValues();
        } catch (error) {
            console.log('ModalCrearCliente-handleForm', error);
        }

    }

    const defaultValues = () => {
        setForm(initialValues);
    }

    const controlCampos = () => {
        const { nombre, apellido, telefono } = form;

        return nombre === '' || apellido === '' || telefono === '';
    }

    return (
        <>
            <div className="modal fade modal-lg" id="modalCreateCliente" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog rounded sombra">

                    <div className="modal-content bg-dark shadow-lg ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 m-t" id="modalLabel"><strong>NUEVO CLIENTE</strong></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={defaultValues} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleForm}>

                                <div className="mb-3">
                                    <label htmlFor="Nombre" className="form-label">Nombre</label>
                                    <input
                                        name="nombre"
                                        type="text"
                                        className="form-control p-2"
                                        id="Nombre"
                                        placeholder='Ingrese el nombre'
                                        onChange={handleInputChange}
                                        value={form.nombre}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="apellido" className="form-label">Apellido</label>
                                    <input
                                        name="apellido"
                                        type="text"
                                        className="form-control p-2"
                                        id="apellido"
                                        placeholder='Ingrese el apellido'
                                        onChange={handleInputChange}
                                        value={form.apellido}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor='telefono' className="form-label">Teléfono</label>
                                    <input
                                        name='telefono'
                                        type='texto'
                                        className="form-control p-2"
                                        id="telefono"
                                        placeholder='Ingrese el telefono'
                                        onChange={handleInputChange}
                                        value={form.telefono}
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                <button type="submit" className="btn btn-primary mt-4" data-bs-dismiss={`${controlCampos() ? '' : 'modal'}`} >Guardar Cambios</button>

                                    <button type="button" className="btn btn-secondary mt-4" data-bs-dismiss="modal" onClick={defaultValues} >Close</button>

                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ModalCrearCliente;