import Chat from "../../features/chats/ui/pages/Chat";
import Settings from "../../features/settings/ui/pages/Settings";
import Dashboard from "../../features/dashboard/ui/pages/Dashboard";

export const commonRoutes = [
    {
        path: "",
        element: <Dashboard/>
    },
    {
        path: "chat",
        element: <Chat/>
    },
    {
        path: "settings",
        element: <Settings/>
    }
]