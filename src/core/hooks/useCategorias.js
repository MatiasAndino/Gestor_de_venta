import { useEffect, useState } from "react"

const useCategorias = () => {
    
    const [categorias, setCategorias] = useState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const extraerCategorias = async () => {
            try {
                const datos = await getCategorias();
                setCategorias(() => [...datos]);
            } catch (error) {
                console.log('useCategorias - useEffect', error);             
            } finally {
                setIsLoading(false);
            }
        }

        extraerCategorias();
    },[]) 

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

            return json;
        } catch (error) {
            console.log('useProductos-getCategorias', error);
        }
    }

    return { categorias, isLoading, getCategoria, getCategorias };

}

export default useCategorias;