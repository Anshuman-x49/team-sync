import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faCalendarDays,
    faEye,
    faPenToSquare,
    faTrashCan,
    faCopy,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import DepartmentBadge from "./DepartmentBadge";
import EmployeeAvatar from "./EmployeeAvatar";
import RoleBadge from "./RoleBadge";
import StatusBadge from "./StatusBadge";
import type { IEmployee } from "../../hooks/useEmployee";

interface EmployeeCardProps {
    employee: IEmployee;
    onView: (employee: IEmployee) => void;
    onEdit: (employee: IEmployee) => void;
    onDelete: (employee: IEmployee) => void;
}

const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return dateStr;
    }
};

const EmployeeCard = ({
    employee,
    onView,
    onEdit,
    onDelete,
}: EmployeeCardProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (employee.email) {
            navigator.clipboard.writeText(employee.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div
            onClick={() => onView(employee)}
            className="relative flex flex-col justify-between rounded-2xl border border-(--border) bg-(--surface) p-5 cursor-pointer overflow-hidden"
        >
            <div>
                {/* Header row: Avatar + Status */}
                <div className="flex items-start justify-between gap-3">
                    <EmployeeAvatar
                        avatar={employee.avatar}
                        name={employee.name}
                        size="lg"
                    />

                    <div className="flex flex-col items-end gap-1.5">
                        <StatusBadge status={employee.status} size="sm" />
                        <RoleBadge role={employee.role} size="sm" />
                    </div>
                </div>

                {/* Identity */}
                <div className="mt-4">
                    <h3 className="text-lg font-bold tracking-tight text-(--text) line-clamp-1">
                        {employee.name || "Unnamed Employee"}
                    </h3>
                    <div className="mt-1 flex items-center justify-between gap-2">
                        <DepartmentBadge department={employee.department} />
                        <span className="text-[11px] font-mono text-(--text-muted) truncate max-w-25" title={employee._id}>
                            #{employee._id ? employee._id.slice(-6) : "------"}
                        </span>
                    </div>
                </div>

                {/* Info List */}
                <div className="mt-4 space-y-2 border-t border-(--border) pt-3 text-xs text-(--text-muted)">
                    {/* Email */}
                    <div className="flex items-center justify-between gap-2 rounded-lg bg-(--surface-low) px-2.5 py-1.5">
                        <div className="flex items-center gap-2 truncate">
                            <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5 text-(--text-muted) shrink-0" />
                            <span className="truncate">{employee.email || "No email"}</span>
                        </div>
                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            title="Copy email"
                            className="text-(--text-muted) hover:text-(--text) cursor-pointer p-0.5"
                        >
                            <FontAwesomeIcon
                                icon={copied ? faCheck : faCopy}
                                className={`h-3 w-3 ${copied ? "text-emerald-400" : ""}`}
                            />
                        </button>
                    </div>

                    {/* Joined Date */}
                    <div className="flex items-center justify-between px-1 text-[11px]">
                        <span className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faCalendarDays} className="h-3 w-3 opacity-75" />
                            <span>Joined:</span>
                        </span>
                        <span className="font-medium text-(--text)">
                            {formatDate(employee.createdAt)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex items-center gap-2 border-t border-(--border) pt-3">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onView(employee);
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-(--border) bg-(--surface-low) py-1.5 text-xs font-semibold text-(--text) transition-colors hover:bg-(--surface-high) cursor-pointer"
                >
                    <FontAwesomeIcon icon={faEye} className="h-3 w-3 text-(--primary)" />
                    <span>View Details</span>
                </button>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(employee);
                    }}
                    title="Edit Employee"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-(--border) bg-(--surface-low) text-(--text-muted) transition-colors hover:text-(--text) hover:bg-(--surface-high) cursor-pointer"
                >
                    <FontAwesomeIcon icon={faPenToSquare} className="h-3.5 w-3.5" />
                </button>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(employee);
                    }}
                    title="Delete Employee"
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-colors hover:bg-rose-500/20 cursor-pointer"
                >
                    <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;
