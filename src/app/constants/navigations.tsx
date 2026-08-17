import {
    faTableColumns,
    faListCheck,
    faUser,
    faComments,
    faCalendarCheck,
    faGear,
    faBuilding,
    faFileLines,
    faUsers,
    type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export interface NavigationItem {
    path: string;
    icon: IconDefinition;
    title: string;
}

export const employeeNavigations: NavigationItem[] = [
    {
        path: "/home",
        icon: faTableColumns,
        title: "Dashboard",
    },
    {
        path: "/home/myTask",
        icon: faListCheck,
        title: "My Task",
    },
    {
        path: "/home/profile",
        icon: faUser,
        title: "Profile",
    },
    {
        path: "/home/chat",
        icon: faComments,
        title: "Chat",
    },
    {
        path: "/home/attendance",
        icon: faCalendarCheck,
        title: "Attendance",
    },
    {
        path: "/home/settings",
        icon: faGear,
        title: "Settings",
    },
];

export const adminNavigations: NavigationItem[] = [
    {
        path: "/home",
        icon: faTableColumns,
        title: "Dashboard",
    },
    {
        path: "/home/tasks",
        icon: faListCheck,
        title: "Tasks",
    },
    {
        path: "/home/department",
        icon: faBuilding,
        title: "Department",
    },
    {
        path: "/home/document",
        icon: faFileLines,
        title: "Document",
    },
    {
        path: "/home/employee",
        icon: faUsers,
        title: "Employee",
    },
    {
        path: "/home/chat",
        icon: faComments,
        title: "Chat",
    },
    {
        path: "/home/settings",
        icon: faGear,
        title: "Settings",
    },
];
