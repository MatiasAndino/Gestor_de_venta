import useControl from "./useControl";
import useCategorias from "./useCategorias";
import useProveedores from "./useProveedores";
import { useEffect, useState } from "react";

export const useProductos = () => {

    const { controlToken } = useControl();
    const { categorias, isLoading : categoriaLoading } = useCategorias();
    const { proveedores, isLoading : proveedorLoading } = useProveedores();

    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
        getProductos();
    },[categoriaLoading, proveedorLoading])

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

            setProductos([...datos])
        } catch (error) {
            console.log('useProductos-getProductos', error);
        }
    }

    return { productos }
};