import { useState, useMemo } from "react";
import {
    useEmployee,
    type Employee as EmployeeType,
    type EmployeeFilters,
    type ViewMode,
    type EmployeeFormData,
} from "../../hooks/useEmployee";
import EmployeeStats from "../components/EmployeeStats";
import EmployeeHeader from "../components/EmployeeHeader";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeDetailModal from "../components/EmployeeDetailModal";
import EmployeeFormModal from "../components/EmployeeFormModal";
import EmployeeDeleteDialog from "../components/EmployeeDeleteDialog";
import EmployeeEmptyState from "../components/EmployeeEmptyState";
import EmployeeSkeletonLoader from "../components/EmployeeSkeletonLoader";

const Employee = () => {
    const { data, isPending } = useEmployee();

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

    const [formEmployee, setFormEmployee] = useState<EmployeeType | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState<EmployeeType | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" } | null>(null);

    const showToast = (text: string, type: "success" | "info" = "success") => {
        setToastMessage({ text, type });
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Extract employee array directly from API data, defaulting to an empty array []
    const rawEmployees: EmployeeType[] = useMemo(() => {
        if (!data) return [];

        if (Array.isArray(data)) {
            return data as EmployeeType[];
        }

        if (typeof data === "object") {
            const maybeArr = (data as unknown as { employees?: EmployeeType[] }).employees;
            if (Array.isArray(maybeArr)) {
                return maybeArr;
            }
            if ("name" in data && "_id" in data) {
                return [data as EmployeeType];
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
                const matchesId = emp._id?.toLowerCase().includes(q);

                if (!matchesName && !matchesEmail && !matchesDept && !matchesRole && !matchesId) {
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

    // Action Handlers
    const handleFilterChange = (newFilters: Partial<EmployeeFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
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
    };

    const handleViewDetail = (emp: EmployeeType) => {
        setSelectedEmployee(emp);
        setIsDetailOpen(true);
    };

    const handleOpenAddForm = () => {
        setFormEmployee(null);
        setIsFormOpen(true);
    };

    const handleOpenEditForm = (emp: EmployeeType) => {
        setFormEmployee(emp);
        setIsFormOpen(true);
    };

    const handleOpenDelete = (emp: EmployeeType) => {
        setDeleteTarget(emp);
        setIsDeleteOpen(true);
    };

    const handleSaveEmployee = async (formData: EmployeeFormData) => {
        showToast(formEmployee ? `Updating employee "${formData.name}"...` : `Creating employee "${formData.name}"...`);
        setIsFormOpen(false);
    };

    const handleDeleteEmployee = async () => {
        if (!deleteTarget) return;
        setIsDeleteOpen(false);
        setDeleteTarget(null);
        showToast(`Employee record removed.`, "info");
    };

    const handleRefresh = () => {
        showToast("Refreshing employee data...", "info");
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
                <EmployeeSkeletonLoader viewMode={viewMode} count={6} />
            ) : filteredEmployees.length === 0 ? (
                <EmployeeEmptyState
                    hasFilters={hasActiveFilters}
                    onResetFilters={handleResetFilters}
                    onAddClick={handleOpenAddForm}
                />
            ) : viewMode === "grid" ? (
                /* Responsive vertical grid layout for employee cards */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredEmployees.map((emp) => (
                        <EmployeeCard
                            key={emp._id}
                            employee={emp}
                            onView={handleViewDetail}
                            onEdit={handleOpenEditForm}
                            onDelete={handleOpenDelete}
                        />
                    ))}
                </div>
            ) : (
                <EmployeeTable
                    employees={filteredEmployees}
                    onView={handleViewDetail}
                    onEdit={handleOpenEditForm}
                    onDelete={handleOpenDelete}
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

            <EmployeeFormModal
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setFormEmployee(null);
                }}
                onSubmit={handleSaveEmployee}
                employee={formEmployee}
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