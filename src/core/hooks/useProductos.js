import { useState } from "react";
import useControl from "./useControl";

export const useProductos = () => {

    const { controlToken } = useControl();
    const [categorias, setCategorias] = useState([]);

    const getProductos = async () => {
        try {

            const token = localStorage.getItem('Authorization');

            let config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':token
                },
            }
            let res = await fetch(`http://localhost:3000/api/productos`, config);

            controlToken(res.status);

            let json = await res.json();

            let nuevasCategorias = [];
            if (categorias.length === 0) {
                nuevasCategorias = await getCategorias();
                setCategorias(() => nuevasCategorias);
            }

            return json.map(item => {
                const categoria = nuevasCategorias.find(c => c.id === item.categoriaId).nombre;
                return {
                    ...item,
                    categoria
                }
            });
        } catch (error) {
            console.log('useProductos-getProductos', error);
        }
    }

    const getCategoria = async (id) => {
        try {
            let config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            let res = await fetch(`http://localhost:3000/api/categorias/${id}`, config);
            let json = await res.json();



            return json;
        } catch (error) {
            console.log('useProductos-getCategoria', error);
        }
    }
    
    const getCategorias = async () => {
        try {
            let config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            let res = await fetch(`http://localhost:3000/api/categorias`, config);
            let json = await res.json();
            
            console.log('ca', json)

            return json;
        } catch (error) {
            console.log('useProductos-getCategorias', error);
        }
    }

    return { getProductos, getCategoria, getCategorias };
};