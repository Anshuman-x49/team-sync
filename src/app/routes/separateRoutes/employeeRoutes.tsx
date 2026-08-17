import Attendance from "../../../features/employee module/attendance/ui/pages/Attendance";
import MyTask from "../../../features/employee module/myTask/ui/pages/MyTask";
import Profile from "../../../features/employee module/profile/ui/pages/Profile";

export const employeeRoutes = [
    {
        path: "/home/attendance",
        element: <Attendance />
    },
    {
        path: "/home/myTask",
        element: <MyTask />
    },
    {
        path: "/home/profile",
        element: <Profile />
    }
]