import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersSlash, faRotateLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";

interface EmployeeEmptyStateProps {
    hasFilters: boolean;
    onResetFilters: () => void;
    onAddClick: () => void;
}

const EmployeeEmptyState = ({
    hasFilters,
    onResetFilters,
    onAddClick,
}: EmployeeEmptyStateProps) => {
    return (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-(--border) bg-(--surface) p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--surface-high) text-(--text-muted) border border-(--border) mb-4">
                <FontAwesomeIcon icon={faUsersSlash} className="h-7 w-7" />
            </div>

            <h3 className="text-xl font-bold text-(--text)">No Employees Found</h3>
            <p className="mt-1 max-w-sm text-sm text-(--text-muted)">
                {hasFilters
                    ? "No records matched your search parameters. Try clearing filters or searching for another term."
                    : "No employee records exist yet. Click below to add your first employee."}
            </p>

            <div className="mt-6 flex items-center gap-3">
                {hasFilters ? (
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--surface-low) px-4 py-2.5 text-xs font-semibold text-(--text) hover:bg-(--surface-high) transition-all cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faRotateLeft} className="h-3.5 w-3.5" />
                        <span>Reset Filters</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onAddClick}
                        className="flex items-center gap-2 rounded-xl bg-(--primary) px-5 py-2.5 text-xs font-semibold text-(--on-primary) shadow-sm hover:opacity-90 transition-all cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faUserPlus} className="h-3.5 w-3.5" />
                        <span>Add First Employee</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmployeeEmptyState;
