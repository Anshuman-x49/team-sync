import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import AuthLayout from "../layouts/AuthLayout"
import Login from "../../features/auth/ui/pages/Login"
import Register from "../../features/auth/ui/pages/Register"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { currentEmployee } from "../../features/auth/state/auth/AuthActions"
import type { AppDispatch } from "../store/store"
import PublicRoutes from "./protectedRoutes/PublicRoutes"
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes"
import Dashboardlayout from "../layouts/Dashboardlayout"
import { commonRoutes } from "./commonRoutes"
import RoleBaseRoutes from "./protectedRoutes/RoleBaseRoutes"
import { adminRoutes } from "./separateRoutes/adminRoutes"
import { employeeRoutes } from "./separateRoutes/employeeRoutes"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" replace />
    },
    {
        path: '/auth',
        element: <PublicRoutes />,
        children: [
            {
                path: "",
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <Login />
                    },
                    {
                        path: "register",
                        element: <Register />
                    },
                ]
            },
        ]
    },
    {
        path: "/home",
        element: <ProtectedRoutes />,
        children: [
            {
                path: "",
                element: <Dashboardlayout />,
                children: [
                    ...commonRoutes,
                    {
                        element: <RoleBaseRoutes role={"admin"} />,
                        children: adminRoutes
                    },
                    {
                        element: <RoleBaseRoutes role={"employee"} />,
                        children: employeeRoutes
                    }
                ]
            },
        ]
    }
])

const AppRoute = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        (async () => {
            try {
                const res = await dispatch(currentEmployee()).unwrap();
                console.log("Current employee response:", res);
            } catch (err) {
                console.error("Failed to fetch current employee:", err);
            }
        })();
    }, [dispatch])

    return <RouterProvider router={router} />
}

export default AppRoute