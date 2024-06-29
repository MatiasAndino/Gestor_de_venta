import React from 'react'
import logoutImage from '../../../assets/icons/door-closed.svg'
import logoImage from '../../../assets/icons/logo.png'
import { useAuth } from '../../auth/hooks/useAuth';
import LinkNavbar from './link_navbar';

const Navbar = () => {
    const { logout } = useAuth();

    const nombre = localStorage.getItem('nombre');
    const rol = localStorage.getItem('rol');

    return (

        <nav className="navbar navbar-expand-sm navbar-dark shadow-5-strong text-dark bg-dark bg-opacity-50" >
            <div className='container-fluid d-flex'>
                <div className="d-flex" style={{ marginLeft: '40px', height: '4vh' }}>
                    <a className="navbar-brand"><img src={logoImage} alt='logo' style={{ marginTop: '-10px', maxWidth:'5vh' }} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto fw-semibold">
                            <li className="nav-item">
                                <LinkNavbar text={'PRODUCTOS'} />
                            </li>
                            <li className="nav-item">
                                <LinkNavbar text={'VENTAS'} />
                            </li>
                            <li className="nav-item">
                                <LinkNavbar text={'CLIENTES'} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className=''>
                    <span className='text-light align-middle me-2'><strong>{nombre.toUpperCase()}</strong></span>
                    <span className='text-light align-middle me-3'>[{rol}]</span>
                    <button
                        className='btn btn-danger btn-sm'
                        type="button"
                        onClick={ logout }
                    >
                        <img src={logoutImage} alt="Logout" width="24" height="24" style={{ filter: 'invert(100%)' }} />
                    </button>
                </div>
            </div>
        </nav>

    )
}

export default Navbar