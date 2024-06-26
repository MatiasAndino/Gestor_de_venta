import React, { useEffect, useState } from 'react'
import { useCreate } from '../../hooks/useCreate';
import AlertaError from '../alerts/alerta_error';

const RegistroForm = () => {

    const { create } = useCreate();
    const [message, setMessage] = useState({
        errorPassword: false,
        errorUsuario: false,
        successful: false,
    });

    const [form, setForm] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar_password: '',
        rol: 'empleado'
    });

    useEffect(() => {

        console.log("use effect",message)
        
        
    }, [message]);
    
    const handleForm = async event => {
        event.preventDefault();
        
        try {
            const nuevoUsuario = await create(form);
            
            console.log('NUEVOUSUARIO', nuevoUsuario)
            setMessage(() => {
                return nuevoUsuario;
            });
            
            console.log("FUNCION",message)
            setTimeout(() => {
                setMessage({
                    errorPassword: false,
                    errorUsuario: false,
                    successful: false,
                })
            }, 2000);
        } catch (error) {
            console.log('RegistroForm - handleForm', error);
        }

    }

    const handleInputChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    return (
        <form onSubmit={handleForm}>
            <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">Nombre</label>
                <input
                    name="nombre"
                    type="text"
                    className="form-control p-2"
                    id="Nombre"
                    placeholder='Ingrese su nombre'
                    onChange={handleInputChange}
                    value={form.nombre}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email</label>
                <input
                    name="email"
                    type="email"
                    className="form-control p-2"
                    id="Email"
                    placeholder='Ingrese su email'
                    onChange={handleInputChange}
                    value={form.email}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label" >Password</label>
                <input
                    name="password"
                    type="password"
                    className="form-control p-2"
                    id="password"
                    placeholder='Ingrese su password'
                    onChange={handleInputChange}
                    value={form.password}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label" >Confirmar Password</label>
                <input
                    name="confirmar_password"
                    type="password"
                    className="form-control p-2"
                    id="confirm_password"
                    placeholder='Confirme su password'
                    onChange={handleInputChange}
                    value={form.confirmar_password}
                    required
                />
            </div>

            <label htmlFor="rol" className="form-label" >Rol</label>
            <select
                name='rol'
                className="form-select"
                id="rol"
                onChange={handleInputChange}
                value={form.rol}
            >
                <option value="empleado">Empleado</option>
                <option value="admin">Admin</option>
            </select>

            <button type="submit" className="btn btn-primary mt-4">Registrarse</button>

            {message.errorPassword && <AlertaError mensaje="Email o password incorrectos." />}
            {message.errorUsuario && <AlertaError mensaje="El usuario ya exíste." />}

        </form>
    )
}

export default RegistroForm