import { useEffect, useState } from "react";
import { useClientes } from "../../../hooks/useClientes";
import { useProductos } from "../../../hooks/useProductos";

const ModalActualizarVenta = ({ mostrarAlerta, selectedItem, updateVenta }) => {

    const { clientes, isLoading: clientesLoading } = useClientes();
    const { productos, isLoading: productosLoading } = useProductos();

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
            const { text, type } = await updateVenta(form);

            mostrarAlerta(text, type);
        } catch (error) {
            console.log('ModalActualizarVenta-handleForm', error);
        }

    }

    const defaultValues = () => {
        setForm(selectedItem);
    }

    useEffect(() => {
        if (selectedItem.id === form.id) return;

        setForm(selectedItem);

    }, [selectedItem]);

    return (
        <>
            {
                !clientesLoading && !productosLoading &&
                <div className="modal fade modal-lg" id="modalUpdateVenta" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                    <div className="modal-dialog rounded sombra">

                        <div className="modal-content bg-dark shadow-lg ">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 m-t" id="modalLabel"><strong>ACTUALIZAR VENTA</strong></h1>
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
                                        <label htmlFor="fecha" className="form-label">Fecha</label>
                                        <input
                                            name="fecha"
                                            type="date"
                                            className="form-control p-2"
                                            id="fecha"
                                            placeholder='Ingrese la fecha'
                                            onChange={handleInputChange}
                                            value={form.fecha}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                        <input
                                            name="cantidad"
                                            type="text"
                                            className="form-control p-2"
                                            id="cantidad"
                                            placeholder='Ingrese la cantidad'
                                            onChange={handleInputChange}
                                            value={form.cantidad}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor='total' className="form-label">Total</label>
                                        <input
                                            name='total'
                                            type='number'
                                            className="form-control p-2"
                                            id="total"
                                            placeholder='Ingrese el total'
                                            onChange={handleInputChange}
                                            value={form.total}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='clientesId' className="form-label">Cliente</label>

                                        <select
                                            name='clientesId'
                                            className="form-select"
                                            id="clientesId"
                                            onChange={handleInputChange}
                                            value={form.clientesId}
                                        >
                                            <option value={form.clientesId}>{form.clientesId}</option>

                                            {
                                                clientes.filter(cliente => cliente.nombre !== form.clientesId).map(cliente => (
                                                    <option value={ `${cliente.nombre} ${cliente.apellido}` } key={cliente.id}>{`${cliente.nombre} ${cliente.apellido}` }</option>)
                                                )
                                            }

                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor='productoId' className="form-label">Producto</label>

                                        <select
                                            name='productoId'
                                            className="form-select"
                                            id="productoId"
                                            onChange={handleInputChange}
                                            value={form.productoId}
                                        >
                                            <option value={form.productoId}>{form.productoId}</option>

                                            {
                                                productos.filter(producto => producto.nombre !== form.productoId).map(producto => (
                                                    <option value={producto.nombre} key={producto.id}>{producto.nombre}</option>)
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
            }
        </>
    )
}

export default ModalActualizarVenta;