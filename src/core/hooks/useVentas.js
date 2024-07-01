import { useClientes } from "./useClientes";
import useControl from "./useControl";
import { useEffect, useState } from "react";
import { useProductos } from "./useProductos";
import { API_URL } from "../constants/constants";

export const useVentas = () => {

    const typeMessage = {
        error: 'error',
        successful: 'successful'
    }


    const { controlToken } = useControl();
    const { clientes, isLoading: clientesLoading } = useClientes();
    const { productos, isLoading: productosLoading } = useProductos();

    const [ventas, setVentas] = useState([]);
    const [update, setUpdate] = useState([]);


    useEffect(() => {
        const extraerVentas = async () => {
            if (clientesLoading || productosLoading) return;
            
            try {
                const datos = await getVentas();
                setVentas(() => [...datos]);
            } catch (error) {
                console.log('useVentas - useEffect', error);
            } 
        }

        extraerVentas();
    }, [clientesLoading, productosLoading, update])

    const getVentas = async () => {

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
            let res = await fetch(`${API_URL}/api/ventas`, config);

            controlToken(res.status);

            let json = await res.json();

            const datos = json.map(item => {
                const clienteNombre = clientes?.find(cliente => cliente.id === item.clientesId).nombre || item.clienteId;
                const clienteApellido = clientes?.find(cliente => cliente.id === item.clientesId).apellido || item.clienteId;
                const clientesId = `${clienteNombre} ${clienteApellido}`
                const productoId = productos?.find(producto => producto.id === item.productoId).nombre || item.productoId;
                
                return {
                    ...item,
                    clientesId,
                    productoId
                }
            });
            
            return datos;
        } catch (error) {
            console.log('useVentas-getVentas', error);
        }
    }

    // const deleteVenta = async (id) => {
    //     try {
    //         const token = localStorage.getItem('Authorization');

    //         let config = {
    //             method: 'DELETE',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': token
    //             },
    //         }
    //         let res = await fetch(`http://localhost:3000/api/ventas/${id}`, config);
    //         controlToken(res.status);

    //         let json = await res.json();


    //         if (res.status === 200) {
    //             setUpdate((prev) => !prev);
    //             return { text: json.message, type: typeMessage.successful };
    //         }
    //         return { text: json.error, type: typeMessage.error };
    //     } catch (error) {
    //         console.log('useVentas-deleteVenta', error)
    //     }
    // }

    // const updateVenta = async (form) => {
    //     const token = localStorage.getItem('Authorization');

    //     const clientesId = clientes.find(cliente => `${cliente.nombre} ${cliente.apellido}` === form.clientesId).id;
    //     const productoId = productos.find(producto => producto.nombre === form.productoId).id;

    //     const realForm = {
    //         ...form,
    //         clientesId,
    //         productoId,
    //     }

    //     try {
    //         let config = {
    //             method: 'PUT',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': token
    //             },
    //             body: JSON.stringify(realForm)
    //         }

    //         let res = await fetch(`http://localhost:3000/api/ventas/${realForm.id}`, config);
    //         controlToken(res.status);
    //         let json = await res.json();


    //         if (res.status === 200) {
    //             setUpdate((prev) => !prev);
    //             return { text: json.message, type: typeMessage.successful };
    //         }
    //         return { text: json.error, type: typeMessage.error };


    //     } catch (error) {
    //         console.log('useVentas-updateVenta', error);
    //     }
    // }

    const createVenta = async (form) => {
        const token = localStorage.getItem('Authorization');

        const clientesId = clientes.find(cliente => `${cliente.nombre} ${cliente.apellido}` === form.clientesId).id;

        const realForm = {
            ...form,
            clientesId,
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

            let res = await fetch(`${API_URL}/api/ventas`, config);
            controlToken(res.status);
            let json = await res.json();

            if (res.status === 201) {
                setUpdate((prev) => !prev);
                return { text: 'Venta creada correctamente.', type: typeMessage.successful };
            }
            return { text: json.error, type: typeMessage.error };


        } catch (error) {
            console.log('useVentas-createVenta', error);
        }
    }

    return { ventas, createVenta }
};