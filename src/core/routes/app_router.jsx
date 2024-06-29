import { createBrowserRouter } from "react-router-dom";
import LoginView from "../../features/home/views/login_view";
import RegistroView from "../../features/registro/views/registro_view";
import ProductosView from "../../features/productos/views/productos_view";
import VentasView from "../../features/ventas/views/ventas_view"
import ClientesView from "../../features/clientes/views/clientes_view";
import PrivateRoute from "../auth/components/private_route";
import PublicRoute from "../auth/components/public_route";
import Navbar from "../components/navbar/navbar";


export const appRouter = createBrowserRouter([
    {
        path: '/productos',
        element: (
            <PrivateRoute>
                <Navbar />
                <ProductosView />
            </PrivateRoute>
        )
    },
    {
        path: '/ventas',
        element: (
            <PrivateRoute>
                <Navbar />
                <VentasView />
            </PrivateRoute>
        )
    },
    {
        path: '/clientes',
        element: (
            <PrivateRoute>
                <Navbar />
                <ClientesView />
            </PrivateRoute>
        )
    },
    {
        path: '/',
        element: (
            <PublicRoute>
                <LoginView />
            </PublicRoute>
        )
    },
    {
        path: '/registro',
        element: (
            <PublicRoute>
                <RegistroView />
            </PublicRoute>
        )
    }
]);