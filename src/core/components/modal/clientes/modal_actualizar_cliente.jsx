import { useEffect, useState } from "react";

const ModalActualizarCliente = ({ mostrarAlerta, selectedItem, updateCliente }) => {


    const [form, setForm] = useState(selectedItem)

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
            const { text, type } = await updateCliente(form);

            mostrarAlerta(text, type);
        } catch (error) {
            console.log('ModalActualizarCliente-handleForm', error);
        }

    }

    const defaultValues = () => {
        setForm(selectedItem);
    }
    
    const controlCampos = () => {
        const { nombre, apellido, telefono } = form;

        return nombre === '' || apellido === '' || telefono === '';
    }

    useEffect(() => {
        if (selectedItem.id === form.id) return;

        setForm(selectedItem);

    }, [selectedItem]);

    return (
        <>
            <div className="modal fade modal-lg" id="modalUpdateCliente" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog rounded sombra">

                    <div className="modal-content bg-dark shadow-lg ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 m-t" id="modalLabel"><strong>ACTUALIZAR CLIENTE</strong></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={defaultValues} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleForm}>

                                <div className="mb-3">
                                    <label htmlFor="id" className="form-label">Id</label>
                                    <input
                                        name="id"
                                        type="text"
                                        className="form-control p-2"
                                        id="id"
                                        onChange={handleInputChange}
                                        value={form.id}
                                        disabled
                                    />
                                </div>

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
                                        placeholder='Ingrese la descripción'
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

export default ModalActualizarCliente;