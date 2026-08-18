import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
    useEmployee,
    type Employee as EmployeeType,
    type EmployeeFilters,
    type ViewMode,
} from "../../hooks/useEmployee";
import EmployeeStats from "../components/EmployeeStats";
import EmployeeHeader from "../components/EmployeeHeader";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeDetailModal from "../components/EmployeeDetailModal";
import EmployeeDeleteDialog from "../components/EmployeeDeleteDialog";
import EmployeeEmptyState from "../components/EmployeeEmptyState";
import EmployeeSkeletonLoader from "../components/EmployeeSkeletonLoader";
import EmployeePagination from "../components/EmployeePagination";

const Employee = () => {
    const navigate = useNavigate();

    // TanStack Query with pagination & caching (fixed 20 items per page limit)
    const {
        data,
        isPending,
        isPlaceholderData,
        page,
        setPage,
        limit,
        refetch,
    } = useEmployee(1, 20);

    // Local state for view mode
    const [viewMode, setViewMode] = useState<ViewMode>("grid");

    // Local state for search & filtering
    const [filters, setFilters] = useState<EmployeeFilters>({
        search: "",
        department: "all",
        status: "all",
        role: "all",
        sortBy: "name",
        sortOrder: "asc",
    });

    // Modal state
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState<EmployeeType | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" } | null>(null);

    const showToast = (text: string, type: "success" | "info" = "success") => {
        setToastMessage({ text, type });
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Extract employee array directly from API response, defaulting to an empty array []
    const rawEmployees: EmployeeType[] = useMemo(() => {
        if (!data) return [];

        if (Array.isArray(data)) {
            return data as EmployeeType[];
        }

        if (typeof data === "object") {
            const obj = data as Record<string, unknown>;

            if (Array.isArray(obj.data)) {
                return obj.data as EmployeeType[];
            }
            if (Array.isArray(obj.employees)) {
                return obj.employees as EmployeeType[];
            }
            if (Array.isArray(obj.results)) {
                return obj.results as EmployeeType[];
            }
            if (Array.isArray(obj.result)) {
                return obj.result as EmployeeType[];
            }
            if ("name" in obj && "email" in obj) {
                return [obj as unknown as EmployeeType];
            }
        }

        return [];
    }, [data]);

    // Unique departments extracted dynamically
    const departments = useMemo(() => {
        const set = new Set<string>();
        rawEmployees.forEach((e) => {
            if (e.department) set.add(e.department);
        });
        return Array.from(set).sort();
    }, [rawEmployees]);

    // Filtered employees list
    const filteredEmployees = useMemo(() => {
        return rawEmployees.filter((emp) => {
            // Search filter
            if (filters.search.trim()) {
                const q = filters.search.toLowerCase();
                const matchesName = emp.name?.toLowerCase().includes(q);
                const matchesEmail = emp.email?.toLowerCase().includes(q);
                const matchesDept = emp.department?.toLowerCase().includes(q);
                const matchesRole = emp.role?.toLowerCase().includes(q);

                if (!matchesName && !matchesEmail && !matchesDept && !matchesRole) {
                    return false;
                }
            }

            // Department filter
            if (filters.department !== "all") {
                if (emp.department?.toLowerCase() !== filters.department.toLowerCase()) {
                    return false;
                }
            }

            // Status filter
            if (filters.status !== "all") {
                if (emp.status?.toLowerCase() !== filters.status.toLowerCase()) {
                    return false;
                }
            }

            return true;
        });
    }, [rawEmployees, filters]);

    // Paginated employees for current page
    const totalItems = filteredEmployees.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));

    // Clamp page to valid range
    const validPage = Math.min(Math.max(1, page), totalPages);

    const paginatedEmployees = useMemo(() => {
        const start = (validPage - 1) * limit;
        return filteredEmployees.slice(start, start + limit);
    }, [filteredEmployees, validPage, limit]);

    // Action Handlers
    const handleFilterChange = (newFilters: Partial<EmployeeFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        setPage(1); // Reset to page 1 on filter change
    };

    const handleResetFilters = () => {
        setFilters({
            search: "",
            department: "all",
            status: "all",
            role: "all",
            sortBy: "name",
            sortOrder: "asc",
        });
        setPage(1);
    };

    const handleViewDetail = (emp: EmployeeType) => {
        setSelectedEmployee(emp);
        setIsDetailOpen(true);
    };

    const handleOpenAddForm = () => {
        navigate("/home/add-employee");
    };

    const handleOpenEditForm = (emp: EmployeeType) => {
        const identifier = encodeURIComponent(emp.email || emp.name || "");
        navigate(`/home/edit-employee/${identifier}`);
    };

    const handleOpenDelete = (emp: EmployeeType) => {
        setDeleteTarget(emp);
        setIsDeleteOpen(true);
    };

    const handleDeleteEmployee = async () => {
        if (!deleteTarget) return;
        setIsDeleteOpen(false);
        setDeleteTarget(null);
        showToast(`Employee record removed.`, "info");
    };

    const handleRefresh = async () => {
        showToast("Refreshing employee data...", "info");
        await refetch();
    };

    const hasActiveFilters =
        Boolean(filters.search) ||
        filters.department !== "all" ||
        filters.status !== "all";

    return (
        <div className="space-y-6 pb-12">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-(--primary)/30 bg-(--surface-high) px-4 py-3 text-sm font-semibold text-(--text) shadow-2xl backdrop-blur-md animate-bounce">
                    <span className="h-2 w-2 rounded-full bg-(--primary)" />
                    <span>{toastMessage.text}</span>
                </div>
            )}

            {/* Metrics Overview - 4 Header Cards */}
            <EmployeeStats employees={rawEmployees} />

            {/* Header Toolbar */}
            <EmployeeHeader
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                departments={departments}
                totalCount={filteredEmployees.length}
                onAddClick={handleOpenAddForm}
                onRefresh={handleRefresh}
                isRefreshing={isPending}
            />

            {/* Main Content Area */}
            {isPending ? (
                <EmployeeSkeletonLoader viewMode={viewMode} count={limit} />
            ) : filteredEmployees.length === 0 ? (
                <EmployeeEmptyState
                    hasFilters={hasActiveFilters}
                    onResetFilters={handleResetFilters}
                    onAddClick={handleOpenAddForm}
                />
            ) : viewMode === "grid" ? (
                /* Responsive vertical grid layout for employee cards */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {paginatedEmployees.map((emp, idx) => (
                        <EmployeeCard
                            key={emp.email || idx}
                            employee={emp}
                            onView={handleViewDetail}
                            onEdit={handleOpenEditForm}
                            onDelete={handleOpenDelete}
                        />
                    ))}
                </div>
            ) : (
                <EmployeeTable
                    employees={paginatedEmployees}
                    onView={handleViewDetail}
                    onEdit={handleOpenEditForm}
                    onDelete={handleOpenDelete}
                />
            )}

            {/* Pagination Controls */}
            {!isPending && totalItems > 0 && (
                <EmployeePagination
                    currentPage={validPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={limit}
                    onPageChange={setPage}
                    isPlaceholderData={isPlaceholderData}
                />
            )}

            {/* Modals */}
            <EmployeeDetailModal
                employee={selectedEmployee}
                isOpen={isDetailOpen}
                onClose={() => {
                    setIsDetailOpen(false);
                    setSelectedEmployee(null);
                }}
                onEdit={handleOpenEditForm}
                onDelete={handleOpenDelete}
            />

            <EmployeeDeleteDialog
                isOpen={isDeleteOpen}
                onClose={() => {
                    setIsDeleteOpen(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleDeleteEmployee}
                employee={deleteTarget}
            />
        </div>
    );
};

export default Employee;
