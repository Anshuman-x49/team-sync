import { useState, useEffect } from "react";
import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { getAllEmployees } from "../api/employeeApi";

export interface Employee {
    avatar: string;
    createdAt: string;
    department: string;
    email: string;
    name: string;
    role: string;
    status: string;
    updatedAt: string;
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

export const DEFAULT_EMPLOYEES: Employee[] = [];

export const useEmployee = (initialPage: number = 1, initialLimit: number = 20) => {
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
    const queryClient = useQueryClient();

    const { data, isPending, isPlaceholderData, isFetching, refetch } = useQuery({
        queryKey: ["employees", page, limit],
        queryFn: () => getAllEmployees({ page, limit }),
        placeholderData: keepPreviousData,
        staleTime: 60000,
        gcTime: 1000 * 60 * 10,
    });

    // Automatically prefetch NEXT page data into TanStack Query cache
    useEffect(() => {
        const nextPage = page + 1;
        queryClient.prefetchQuery({
            queryKey: ["employees", nextPage, limit],
            queryFn: () => getAllEmployees({ page: nextPage, limit }),
            staleTime: 60000,
        });
    }, [page, limit, queryClient]);

    return {
        data,
        isPending,
        isPlaceholderData,
        isFetching,
        page,
        setPage,
        limit,
        setLimit,
        refetch,
    };
};
