import React from 'react';
import RegistroForm from '../../../core/components/form/registro_form';
import { useNavigate } from 'react-router-dom';

const RegistroView = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex vh-100 align-items-center">
      <div className="container border rounded col-auto p-5 bg-custom-opacity text-light min-width-25" >
        <h2 className='text-center mb-5'>CREAR NUEVA CUENTA</h2>
        <RegistroForm />
        <p className='mt-4'>Ya tienes una cuenta? <a className="link-opacity-100 pointer" role="button" onClick={() => navigate('/')}>Logín</a></p>
      </div>
    </div>
  )
};

export default RegistroView;