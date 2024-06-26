import React from 'react';
import { useProductos } from '../../hooks/useProductos';

const TablaProductos = () => {

    const {getProductos,getCategoria, getCategorias} = useProductos();


    async function handleClick(){
        // getCategoria(2);
        try {
            const res = await getProductos();
            console.log(res)
        } catch (error) {
          console.log(error)  
        }
    }


  return (
    <div>
        <button className='btn btn-danger' onClick={handleClick} >OBTENER CATEGORIA</button>
    </div>
  )
};

export default TablaProductos;