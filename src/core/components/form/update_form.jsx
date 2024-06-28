const UpdateForm = ({ item, optionCategorias }) => {


    function handleForm() {

    }

    function handleInputChange() {

    }

    return (
        <div
            className="modal fade "
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            id={`modal-${item.id}`}
        >
            <div className="modal-dialog border border-light rounded">
                <div className="modal-content bg-dark text-light">
                    <div className="modal-header ">
                        <h1 className="modal-title fs-3 justify-content-center text-center">ACTUALIZAR PRODUCTO</h1>
                        <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label htmlFor="id" className="form-label">ID</label>
                                <input
                                    name="id"
                                    type="text"
                                    className="form-control p-2"
                                    id="id"
                                    value={item.id}
                                    disabled
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="producto" className="form-label">Producto</label>
                                <input
                                    name="producto"
                                    type="text"
                                    className="form-control p-2"
                                    id="producto"
                                    placeholder='Ingrese el producto'
                                    onChange={handleInputChange}
                                    value={item.nombre}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="precio" className="form-label">Precio</label>
                                <input
                                    name="precio"
                                    type="number"
                                    className="form-control p-2"
                                    id="precio"
                                    placeholder='Ingrese el precio'
                                    onChange={handleInputChange}
                                    value={item.precio}
                                    required
                                />
                            </div>

                            <label htmlFor="categoria" className="form-label" >Categoria</label>
                            <select
                                name='categoria'
                                className="form-select"
                                id="categoria"
                                onChange={handleInputChange}
                            >
                                {
                                    // optionCategorias.map(({ id, value }) => (
                                    //     <option value={value} key={id}>{value}</option>
                                    // ))
                                    // optionCategorias.forEach(a => console.log(a))

                                }
                            </select>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">GUARDAR CAMBIOS</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateForm