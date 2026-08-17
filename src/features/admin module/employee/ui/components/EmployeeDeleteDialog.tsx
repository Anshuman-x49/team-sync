import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { Employee } from "../../hooks/useEmployee";

interface EmployeeDeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    employee: Employee | null;
    isLoading?: boolean;
}

const EmployeeDeleteDialog = ({
    isOpen,
    onClose,
    onConfirm,
    employee,
    isLoading = false,
}: EmployeeDeleteDialogProps) => {
    if (!isOpen || !employee) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div
                className="relative w-full max-w-md overflow-hidden rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-2xl transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-(--text-muted) hover:text-(--text) cursor-pointer"
                >
                    <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/20 mb-4">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-bold text-(--text)">Delete Employee?</h3>
                    <p className="mt-2 text-sm text-(--text-muted)">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-(--text)">{employee.name}</span> (
                        {employee.email})? This operation cannot be undone.
                    </p>

                    <div className="mt-6 flex w-full items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-(--border) bg-(--surface-low) py-2.5 text-xs font-semibold text-(--text-muted) hover:text-(--text) transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-600 transition-all cursor-pointer disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
                            <span>{isLoading ? "Deleting..." : "Delete Permanently"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDeleteDialog;
