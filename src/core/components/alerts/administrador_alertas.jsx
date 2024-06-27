import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import AlertaSuccessful from './alerta_successful';
import AlertaError from './alerta_error';

const AdministradorAlertas = forwardRef((props, ref) => {

    const TTL = 1500;

    const ERROR = 'error';
    const SUCCESSFUL = 'successful'

    const initState = {
        error: false,
        successful: false
    };

    const [show, setShow] = useState(initState);
    const [message, setMessage] = useState('');

    function showMessage(text, type) {
        if (show.error || show.successful) {
            if (show.error && type.toLowerCase() === ERROR) return;
            if (show.successful && type.toLowerCase() === SUCCESSFUL) return;
        };

        setMessage(() => text)
        setShow((prev) => ({
            ...prev,
            [type]:true
        }))

        setTimeout(() => {
            setShow(() => initState);
            setMessage(() => '')
        }, TTL);
    }
    
    useImperativeHandle(ref, () => ({
        showMessage
    }));
    
    return (
        <>
            {show.error && <AlertaError message={message} />}
            {show.successful && <AlertaSuccessful message={message} />}
        </>
    )
})

export default AdministradorAlertas