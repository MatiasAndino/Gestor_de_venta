import React from 'react'
import { AuthProvider } from '../auth/provider/auth_provider'

const RootProviders = ({ children }) => {
    return (
        <AuthProvider>
            { children }
        </AuthProvider>
    )
}

export default RootProviders