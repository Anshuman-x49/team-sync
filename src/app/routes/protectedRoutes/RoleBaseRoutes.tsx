import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"
import type { RootState } from "../../store/store"


const RoleBaseRoutes = ({ role }: { role: string }) => {

    const { employee } = useSelector((state: RootState) => state.auth);

    if(employee?.role !== role) {
        return <Navigate to={"/unauthorized"} replace />
    }

    return <Outlet />
}

export default RoleBaseRoutes