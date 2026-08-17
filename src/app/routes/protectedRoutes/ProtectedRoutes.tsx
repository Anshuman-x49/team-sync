import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
    const { employee, isLoading } = useSelector((state: RootState) => state.auth);

    // While loading, show nothing or a loading spinner
    if (isLoading) {
        // Return null to show nothing, or a Spinner component
        return null;
    }

    // If employee is logged in, redirect to home
    if (!employee) {
        return <Navigate to="/auth/login" replace />;
    }

    // If not logged in, render children (the public routes)
    return <Outlet />;
}

export default ProtectedRoutes