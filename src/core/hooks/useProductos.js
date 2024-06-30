import useControl from "./useControl";
import useCategorias from "./useCategorias";
import useProveedores from "./useProveedores";
import { useEffect, useState } from "react";

export const useProductos = () => {

    const typeMessage = {
        error: 'error',
        successful: 'successful'
    }

    const { controlToken } = useControl();
    const { categorias, isLoading: categoriaLoading } = useCategorias();
    const { proveedores, isLoading: proveedorLoading } = useProveedores();

    const [productos, setProductos] = useState([]);
    const [update, setUpdate] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const extraerProductos = async () => {
            try {
                const datos = await getProductos();
                setProductos(() => [...datos]);
            } catch (error) {
                console.log('useProductos - useEffect', error);
            } finally {
                setIsLoading(false);
            }
        }

        extraerProductos();
    }, [categoriaLoading, proveedorLoading, update])

    const getProductos = async () => {

        try {

            const token = localStorage.getItem('Authorization');

            let config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            }
            let res = await fetch(`http://localhost:3000/api/productos`, config);

            controlToken(res.status);

            let json = await res.json();

            const datos = json.map(item => {
                const categoriaId = categorias?.find(categoria => categoria.id === item.categoriaId).nombre || item.categoriaId;
                const proveedorId = proveedores?.find(proveedor => proveedor.id === item.proveedorId).nombre || item.proveedorId;

                return {
                    ...item,
                    categoriaId,
                    proveedorId
                }
            });

            return datos;
        } catch (error) {
            console.log('useProductos-getProductos', error);
        }
    }

    const deleteProducto = async (id) => {
        try {
            const token = localStorage.getItem('Authorization');

            let config = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            }
            let res = await fetch(`http://localhost:3000/api/productos/${id}`, config);
            controlToken(res.status);

            let json = await res.json();


            if (res.status === 200) {
                setUpdate((prev) => !prev);
                return { text: json.message, type: typeMessage.successful };
            }
            return { text: json.error, type: typeMessage.error };
        } catch (error) {
            console.log('useProductos-deleteProducto', error)
        }
    }

    const updateProducto = async (form) => {
        const token = localStorage.getItem('Authorization');

        const proveedorId = proveedores.find(proveedor => proveedor.nombre === form.proveedorId).id;
        const categoriaId = categorias.find(categoria => categoria.nombre === form.categoriaId).id;

        const realForm = {
            ...form,
            proveedorId,
            categoriaId,
        }

        try {
            let config = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(realForm)
            }

            let res = await fetch(`http://localhost:3000/api/productos/${realForm.id}`, config);
            controlToken(res.status);
            let json = await res.json();

            if (res.status === 200) {
                setUpdate((prev) => !prev);
                return { text: json.message, type: typeMessage.successful };
            }
            return { text: json.error, type: typeMessage.error };


        } catch (error) {
            console.log('useProducto-updateProducto', error);
        }
    }

    const createProducto = async (form) => {
        const token = localStorage.getItem('Authorization');

        const categoriaId = categorias.find(categoria => categoria.nombre === form.categoriaId).id;
        const proveedorId = proveedores.find(proveedor => proveedor.nombre === form.proveedorId).id;

        const realForm = {
            ...form,
            proveedorId,
            categoriaId,
        }

        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(realForm)
            }

            let res = await fetch(`http://localhost:3000/api/productos`, config);
            controlToken(res.status);
            let json = await res.json();

            if (res.status === 201) {
                setUpdate((prev) => !prev);
                return { text: 'Producto creado correctamente.', type: typeMessage.successful };
            }
            return { text: json.error, type: typeMessage.error };


        } catch (error) {
            console.log('useProducto-createProducto', error);
        }
    }

    return { productos, isLoading, deleteProducto, updateProducto, createProducto }
};