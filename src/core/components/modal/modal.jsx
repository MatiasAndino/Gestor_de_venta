import { useEffect, useState } from "react";
import Input from "../input/input";

const Modal = ({ mostrarAlerta, selectedItem, categorias, proveedores, updateProducto }) => {

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
            const { text, type } = await updateProducto(form);

            mostrarAlerta(text, type);
        } catch (error) {
            console.log('Modal-handleForm', error);
        }

    }

    const defaultValues = () => {
        setForm(selectedItem);
    }

    useEffect(() => {

        setForm(selectedItem);

    }, [selectedItem]);

    return (
        <>
            <div className="modal fade modal-lg" id="modalUpdate" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog rounded sombra">

                    <div className="modal-content bg-dark shadow-lg ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalLabel">ACTUALIZAR PRODUCTO</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={defaultValues} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleForm}>

                                <Input
                                    titulo='ID'
                                    name='id'
                                    type="text"
                                    value={selectedItem.id}
                                    disabled
                                />
                                <Input
                                    titulo='NOMBRE'
                                    name='nombre'
                                    type="text"
                                    value={form.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Input
                                    titulo='DESCRIPCIÓN'
                                    name='descripcion'
                                    type="text"
                                    value={form.descripcion}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Input
                                    titulo='PRECIO'
                                    name='precio'
                                    type='number'
                                    value={form.precio}
                                    onChange={handleInputChange}
                                    required
                                />

                                <div className="mb-3">
                                    <label htmlFor='categoriaId' className="form-label">  CATEGORÍA </label>

                                    <select
                                        name='categoriaId'
                                        className="form-select"
                                        id="categoriaId"
                                        onChange={handleInputChange}
                                        value={form.categoriaId}
                                    >
                                        <option value={form.categoriaId}>{form.categoriaId}</option>

                                        {
                                            categorias.filter(cat => cat.nombre !== form.categoriaId).map(cat => (
                                                <option value={cat.nombre} key={cat.id}>{cat.nombre}</option>)
                                            )
                                        }

                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor='proveedorId' className="form-label">  PROVEEDOR </label>

                                    <select
                                        name='proveedorId'
                                        className="form-select"
                                        id="proveedorId"
                                        onChange={handleInputChange}
                                        value={form.proveedorId}
                                    >
                                        <option value={form.proveedorId}>{form.proveedorId}</option>

                                        {
                                            proveedores.filter(prov => prov.nombre !== form.proveedorId).map(prov => (
                                                <option value={prov.nombre} key={prov.id}>{prov.nombre}</option>)
                                            )
                                        }

                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary mt-4" data-bs-dismiss="modal" >Guardar Cambios</button>
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

export default Modal