import { useEffect, useState } from "react"

const useProveedores = () => {
    
    const [proveedores, setProveedores] = useState();
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const extraerProveedores = async () => {
            try {
                const datos = await getProveedores();
                setProveedores(() => [...datos]);
            } catch (error) {
                console.log('useProveedores - useEffect', error);             
            } finally {
                setIsLoading(false);
            }
        }

        extraerProveedores();
    },[]) 

    const getProveedor = async (id) => {
        try {
            let config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            let res = await fetch(`http://localhost:3000/api/proveedores/${id}`, config);
            let json = await res.json();

            return json;
        } catch (error) {
            console.log('useProveedores-getProveedor', error);
        }
    }
    
    const getProveedores = async () => {
        try {
            let config = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            let res = await fetch(`http://localhost:3000/api/proveedores`, config);
            let json = await res.json();

            return json;
        } catch (error) {
            console.log('useProductos-getProveedores', error);
        }
    }

    return { proveedores, isLoading, getProveedor, getProveedores };

}

export default useProveedores;