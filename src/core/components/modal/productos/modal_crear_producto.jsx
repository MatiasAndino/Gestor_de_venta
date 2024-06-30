import { useEffect, useState } from "react";
import useProveedores from "../../../hooks/useProveedores";
import useCategorias from "../../../hooks/useCategorias";

const ModalCrearProducto = ({ mostrarAlerta, createProducto }) => {

    const initialValues = {
        nombre: '',
        descripcion: '',
        precio: '',
        categoriaId: '',
        proveedorId: ''
    }

    const { categorias, isLoading: categoriasLoading } = useCategorias();
    const { proveedores, isLoading: proveedoresLoading } = useProveedores();

    const [form, setForm] = useState(initialValues)

    const handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const controlCampos = () => {
        const { nombre, descripcion, precio, categoriaId, proveedorId } = form;

        return nombre === '' || descripcion === '' || precio === ''
            || categoriaId === '' || proveedorId === '';
    }

    const handleForm = async event => {
        event.preventDefault();

        try {
            const { text, type } = await createProducto(form);

            mostrarAlerta(text, type);

            defaultValues();
        } catch (error) {
            console.log('ModalCrearProducto-handleForm', error);
        }

    }

    const defaultValues = () => {
        setForm(initialValues);
    }

    return (
        <>
            {
                !categoriasLoading && !proveedoresLoading &&
                <div className="modal fade modal-lg" id="modalCreate" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                    <div className="modal-dialog rounded sombra">

                        <div className="modal-content bg-dark shadow-lg ">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 m-t" id="modalLabel"><strong>NUEVO PRODUCTO</strong></h1>
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
                                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                                        <input
                                            name="descripcion"
                                            type="text"
                                            className="form-control p-2"
                                            id="descripcion"
                                            placeholder='Ingrese la descripción'
                                            onChange={handleInputChange}
                                            value={form.descripcion}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor='precio' className="form-label">Precio</label>
                                        <input
                                            name='precio'
                                            type='number'
                                            className="form-control p-2"
                                            id="precio"
                                            placeholder='Ingrese el precio'
                                            onChange={handleInputChange}
                                            value={form.precio}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='categoriaId' className="form-label">Categoría</label>

                                        <select
                                            name='categoriaId'
                                            className="form-select"
                                            id="categoriaId"
                                            onChange={handleInputChange}
                                            value={form.categoriaId}
                                            required
                                        >
                                            <option value=''>Seleccione una categoría</option>
                                            {
                                                categorias.map(cat => (
                                                    <option value={cat.nombre} key={cat.id}>{cat.nombre}</option>)
                                                )
                                            }

                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor='proveedorId' className="form-label">Proveedor</label>

                                        <select
                                            name='proveedorId'
                                            className="form-select"
                                            id="proveedorId"
                                            onChange={handleInputChange}
                                            value={form.proveedorId}
                                            required
                                        >
                                            <option value=''>Seleccione un proveedor</option>


                                            {
                                                proveedores.map(prov => (
                                                    <option value={prov.nombre} key={prov.id}>{prov.nombre}</option>)
                                                )
                                            }

                                        </select>
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
            }
        </>
    )
}

export default ModalCrearProducto;