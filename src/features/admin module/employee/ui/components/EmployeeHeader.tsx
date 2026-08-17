import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faXmark,
    faFilter,
    faTableCellsLarge,
    faListUl,
    faUserPlus,
    faRotate,
} from "@fortawesome/free-solid-svg-icons";
import type { EmployeeFilters, ViewMode } from "../../hooks/useEmployee";



interface EmployeeHeaderProps {
    filters: EmployeeFilters;
    onFilterChange: (filters: Partial<EmployeeFilters>) => void;
    onResetFilters: () => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    departments: string[];
    totalCount: number;
    onAddClick: () => void;
    onRefresh: () => void;
    isRefreshing?: boolean;
}

const EmployeeHeader = ({
    filters,
    onFilterChange,
    onResetFilters,
    viewMode,
    onViewModeChange,
    departments,
    totalCount,
    onAddClick,
    onRefresh,
    isRefreshing = false,
}: EmployeeHeaderProps) => {
    const hasActiveFilters =
        Boolean(filters.search) ||
        filters.department !== "all" ||
        filters.status !== "all";

    return (
        <div className="flex flex-col gap-5">
            {/* Top Bar: Title & Primary Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight text-(--text)">
                            Employee Management
                        </h1>
                        <span className="inline-flex items-center rounded-full bg-(--primary)/15 px-3 py-0.5 text-xs font-semibold text-(--primary) border border-(--primary)/20">
                            {totalCount} total
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-(--text-muted)">
                        View, manage, and inspect team members and their operational statuses.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={isRefreshing}
                        title="Refresh data"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-(--text-muted) transition-all hover:bg-(--surface-high) hover:text-(--text) cursor-pointer disabled:opacity-50"
                    >
                        <FontAwesomeIcon
                            icon={faRotate}
                            className={`h-4 w-4 ${isRefreshing ? "animate-spin text-(--primary)" : ""}`}
                        />
                    </button>

                    {/* View mode toggle */}
                    <div className="flex rounded-xl border border-(--border) bg-(--surface-low) p-1">
                        <button
                            type="button"
                            onClick={() => onViewModeChange("grid")}
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                                viewMode === "grid"
                                    ? "bg-(--surface-high) text-(--text) shadow-sm border border-(--border)"
                                    : "text-(--text-muted) hover:text-(--text)"
                            }`}
                        >
                            <FontAwesomeIcon icon={faTableCellsLarge} className="h-3.5 w-3.5" />
                            <span className="hidden md:inline">Grid</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onViewModeChange("table")}
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                                viewMode === "table"
                                    ? "bg-(--surface-high) text-(--text) shadow-sm border border-(--border)"
                                    : "text-(--text-muted) hover:text-(--text)"
                            }`}
                        >
                            <FontAwesomeIcon icon={faListUl} className="h-3.5 w-3.5" />
                            <span className="hidden md:inline">Table</span>
                        </button>
                    </div>

                    {/* Add Employee button */}
                    <button
                        type="button"
                        onClick={onAddClick}
                        className="flex items-center gap-2 rounded-xl bg-(--primary) px-4 py-2.5 text-sm font-semibold text-(--on-primary) shadow-sm transition-all hover:opacity-90 hover:shadow-md cursor-pointer shrink-0"
                    >
                        <FontAwesomeIcon icon={faUserPlus} className="h-4 w-4" />
                        <span>Add Employee</span>
                    </button>
                </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-(--border) bg-(--surface) p-3">
                {/* Search */}
                <div className="relative flex-1 min-w-55">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-muted)"
                    />
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => onFilterChange({ search: e.target.value })}
                        placeholder="Search by name, email, role, or ID..."
                        className="w-full rounded-xl border border-(--border) bg-(--surface-low) py-2 pl-10 pr-9 text-sm text-(--text) placeholder:text-(--text-muted) outline-none transition-all focus:border-(--primary) focus:bg-(--surface-high)"
                    />
                    {filters.search && (
                        <button
                            type="button"
                            onClick={() => onFilterChange({ search: "" })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text) cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faXmark} className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {/* Department filter */}
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faFilter} className="h-3.5 w-3.5 text-(--text-muted) hidden sm:block" />
                    <select
                        value={filters.department}
                        onChange={(e) => onFilterChange({ department: e.target.value })}
                        className="rounded-xl border border-(--border) bg-(--surface-low) px-3 py-2 text-sm text-(--text) outline-none transition-all focus:border-(--primary) cursor-pointer capitalize"
                    >
                        <option value="all">All Departments</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status filter */}
                <div>
                    <select
                        value={filters.status}
                        onChange={(e) => onFilterChange({ status: e.target.value })}
                        className="rounded-xl border border-(--border) bg-(--surface-low) px-3 py-2 text-sm text-(--text) outline-none transition-all focus:border-(--primary) cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="on_leave">On Leave</option>
                    </select>
                </div>

                {/* Reset filters */}
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-400 transition-all hover:bg-rose-500/20 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
                        <span>Clear</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmployeeHeader;
