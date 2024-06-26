import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistroForm from '../../../core/components/form/registro/registro_form';

const RegistroView = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex vh-100 align-items-center">
      <div className="container border rounded col-auto border-secondary border-2 p-5 bg-dark bg-opacity-100 text-light min-width-25" >

        <h2 className='text-center mb-5'><strong>CREAR NUEVA CUENTA</strong></h2>
        <RegistroForm />
        <p className='mt-4'>Ya tienes una cuenta? <a className="link-opacity-100 pointer" role="button" onClick={() => navigate('/')}>Logín</a></p>
      </div>
    </div>
  )
};

export default RegistroView;