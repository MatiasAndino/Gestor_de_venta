import React, { useState } from 'react';
import { useAuth } from '../../../auth/hooks/useAuth';

const LoginForm = () => {
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleForm = async event => {
        event.preventDefault();

        try {
            await login(form);
        } catch (error) {
            console.log('Login-handleForm', error)
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
                <label htmlFor="Email" className="form-label" >Email</label>
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
                <label htmlFor="Password" className="form-label" >Password</label>
                <input
                    name="password"
                    type="password"
                    className="form-control p-2"
                    id="Password"
                    placeholder='Ingrese su password'
                    onChange={handleInputChange}
                    value={form.password}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary mt-2">Iniciar sesión</button>
        </form>
    )
};

export default LoginForm;