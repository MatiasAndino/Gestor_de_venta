import useControl from "./useControl";
import { useEffect, useState } from "react";

export const useClientes = () => {

    const typeMessage = {
        error: 'error',
        successful: 'successful'
    }

    const { controlToken } = useControl();

    const [clientes, setClientes] = useState([]);
    const [update, setUpdate] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const extraerClientes = async () => {
            try {
                const datos = await getClientes();
                setClientes(() => [...datos]);
            } catch (error) {
                console.log('useClientes - useEffect', error);
            } finally {
                setIsLoading(false);
            }
        }

        extraerClientes();
    }, [update])

    const getClientes = async () => {

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
            let res = await fetch(`http://localhost:3000/api/clientes`, config);

            controlToken(res.status);

            let json = await res.json();


            return json;
            // setClientes([...json])
        } catch (error) {
            console.log('useClientes-getClientes', error);
        }
    }

    const deleteCliente = async (id) => {
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
            let res = await fetch(`http://localhost:3000/api/clientes/${id}`, config);
            controlToken(res.status);

            let json = await res.json();

            if (res.status === 200) {
                setUpdate((prev) => !prev);
                return { text: json.message, type: typeMessage.successful };
            }
            return { text: json.error, type: typeMessage.error };
        } catch (error) {
            console.log('useClientes-deleteCliente', error)
        }
    }

    const updateCliente = async (form) => {
        const token = localStorage.getItem('Authorization');

        try {
            let config = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(form)
            }

            let res = await fetch(`http://localhost:3000/api/clientes/${form.id}`, config);
            controlToken(res.status);
            let json = await res.json();

            if (res.status === 200) {
                setUpdate((prev) => !prev);
                return { text: json.message, type: typeMessage.successful };
            }
            return { text: json.error, type: typeMessage.error };


        } catch (error) {
            console.log('useCliente-updateCliente', error);
        }
    }

    const createCliente = async (form) => {
        const token = localStorage.getItem('Authorization');

        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(form)
            }

            let res = await fetch(`http://localhost:3000/api/clientes`, config);
            controlToken(res.status);
            let json = await res.json();


            if (res.status === 201) {
                setUpdate((prev) => !prev);
                return { text: 'Cliente creado correctamente.', type: typeMessage.successful };
            }
            return { text: json.error, type: typeMessage.error };


        } catch (error) {
            console.log('useCliente-createCliente', error);
        }
    }

    return { clientes, isLoading, deleteCliente, updateCliente, createCliente }
};