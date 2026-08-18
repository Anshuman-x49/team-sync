import Department from "../../../features/admin module/department/ui/pages/Department";
import Document from "../../../features/admin module/documents/ui/pages/Document";
import Employee from "../../../features/admin module/employee/ui/pages/Employee";
import AddEmployee from "../../../features/admin module/employee/ui/pages/AddEmployee";
import Tasks from "../../../features/admin module/tasks/ui/pages/Tasks";

export const adminRoutes = [
    {
        path: "/home/department",
        element: <Department />
    },
    {
        path: "/home/document",
        element: <Document />
    },
    {
        path: "/home/employee",
        element: <Employee />
    },
    {
        path: "/home/add-employee",
        element: <AddEmployee />
    },
    {
        path: "/home/add-employee/:id",
        element: <AddEmployee />
    },
    {
        path: "/home/edit-employee/:id",
        element: <AddEmployee />
    },
    {
        path: "/home/tasks",
        element: <Tasks />
    }
]
