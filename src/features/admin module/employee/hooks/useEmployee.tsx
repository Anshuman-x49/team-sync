import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../api/employeeApi";

export interface Employee {
    avatar: string;
    createdAt: string;
    department: string;
    email: string;
    name: string;
    refreshToken: string;
    role: string;
    status: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

export type IEmployee = Employee;

export type ViewMode = "grid" | "table";

export interface EmployeeFormData {
    name: string;
    email: string;
    department: string;
    role: string;
    status: string;
    avatar?: string;
}

export interface EmployeeFilters {
    search: string;
    department: string;
    status: string;
    role: string;
    sortBy: "name" | "department" | "role" | "status" | "createdAt";
    sortOrder: "asc" | "desc";
}

export const DEFAULT_EMPLOYEES: Employee[] = [
    {
        _id: "6a821a31a06946a0ca82d0a6",
        name: "Netra Rajbanshi",
        email: "netra@gmail.com",
        department: "developer",
        role: "employee",
        status: "active",
        avatar: "",
        refreshToken: "",
        createdAt: "2026-08-16T20:14:41.617Z",
        updatedAt: "2026-08-16T20:14:41.617Z",
        __v: 0,
    },
    {
        _id: "6a821a31a06946a0ca82d0a7",
        name: "Anshuman Nayak",
        email: "anshuman@teamsync.dev",
        department: "engineering",
        role: "admin",
        status: "active",
        avatar: "",
        refreshToken: "",
        createdAt: "2026-08-10T14:32:10.120Z",
        updatedAt: "2026-08-16T18:20:00.000Z",
        __v: 0,
    },
    {
        _id: "6a821a31a06946a0ca82d0a8",
        name: "Sarah Jenkins",
        email: "sarah.j@teamsync.dev",
        department: "design",
        role: "employee",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        refreshToken: "",
        createdAt: "2026-07-22T09:15:00.000Z",
        updatedAt: "2026-08-15T11:00:00.000Z",
        __v: 0,
    },
    {
        _id: "6a821a31a06946a0ca82d0a9",
        name: "Marcus Vance",
        email: "marcus.vance@teamsync.dev",
        department: "developer",
        role: "employee",
        status: "inactive",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        refreshToken: "",
        createdAt: "2026-06-18T08:45:30.000Z",
        updatedAt: "2026-08-12T16:30:20.000Z",
        __v: 0,
    },
    {
        _id: "6a821a31a06946a0ca82d0b0",
        name: "Elena Rostova",
        email: "elena.r@teamsync.dev",
        department: "marketing",
        role: "employee",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        refreshToken: "",
        createdAt: "2026-08-01T12:00:00.000Z",
        updatedAt: "2026-08-14T09:20:10.000Z",
        __v: 0,
    },
    {
        _id: "6a821a31a06946a0ca82d0b1",
        name: "David Kim",
        email: "david.kim@teamsync.dev",
        department: "finance",
        role: "employee",
        status: "on_leave",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        refreshToken: "",
        createdAt: "2026-05-11T10:10:00.000Z",
        updatedAt: "2026-08-16T14:10:00.000Z",
        __v: 0,
    },
];

export const useEmployee = () => {
    const { data, isPending } = useQuery({
        queryKey: ["employees"],
        queryFn: getAllEmployees,
        staleTime: 10000
    });

    return { data, isPending };
};