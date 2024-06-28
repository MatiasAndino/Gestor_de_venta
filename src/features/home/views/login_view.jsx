import React from 'react';
import LoginForm from '../../../core/components/form/login_form';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex vh-100 align-items-center">
        <div className="container border rounded col-auto p-5 bg-custom-opacity text-light min-width-25" >
          <h2 className='text-center mb-5'><strong>INICIAR SESIÓN</strong></h2>
          <LoginForm />
          <p className='mt-4'>No tienes una cuenta? <a className="link-opacity-100" role="button" onClick={() => navigate('/registro')}>Registraté</a></p>
        </div>
      </div>
    </>
  )
};

export default LoginView;