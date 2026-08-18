import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faCopy,
    faCheck,
    faCalendarDays,
    faClock,
    faPenToSquare,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import StatusBadge from "./StatusBadge";
import RoleBadge from "./RoleBadge";
import DepartmentBadge from "./DepartmentBadge";
import EmployeeAvatar from "./EmployeeAvatar";
import type { IEmployee } from "../../hooks/useEmployee";

interface EmployeeDetailModalProps {
    employee: IEmployee | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (employee: IEmployee) => void;
    onDelete?: (employee: IEmployee) => void;
}

const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
        const date = new Date(dateStr);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    } catch {
        return dateStr;
    }
};

const EmployeeDetailModal = ({
    employee,
    isOpen,
    onClose,
    onEdit,
    onDelete,
}: EmployeeDetailModalProps) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    if (!isOpen || !employee) return null;

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto scrollbar-none">
            <div
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-(--border) bg-(--surface) shadow-2xl transition-all my-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Banner */}
                <div className="relative h-28 bg-linear-to-r from-purple-900/40 via-indigo-900/40 to-slate-900/40 border-b border-(--border) p-6 flex items-start justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white cursor-pointer transition-all"
                    >
                        <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                    </button>
                </div>

                {/* Profile Header Avatar overlay */}
                <div className="px-6 -mt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="flex items-end gap-4">
                        <EmployeeAvatar
                            avatar={employee.avatar}
                            name={employee.name}
                            size="xl"
                            className="ring-4 ring-(--surface) rounded-2xl shadow-xl"
                        />
                        <div className="pb-1">
                            <h2 className="text-2xl font-bold tracking-tight text-(--text)">
                                {employee.name || "Unnamed Employee"}
                            </h2>
                            <p className="text-sm text-(--text-muted)">{employee.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pb-1">
                        <StatusBadge status={employee.status} />
                        <RoleBadge role={employee.role} />
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-6">
                    <div className="space-y-6">
                        {/* Primary Attribute: Department Card */}
                        <div className="rounded-2xl border border-(--border) bg-(--surface-low) p-4">
                            <div className="text-xs text-(--text-muted) font-medium mb-2">
                                Department
                            </div>
                            <DepartmentBadge department={employee.department} />
                        </div>

                        {/* Secondary Attributes List */}
                        <div className="rounded-2xl border border-(--border) bg-(--surface-low) divide-y divide-(--border) text-sm">
                            {/* Email */}
                            <div className="flex items-center justify-between p-3.5">
                                <span className="text-xs text-(--text-muted) font-medium">Email Address</span>
                                <div className="flex items-center gap-2 font-medium text-(--text)">
                                    <span>{employee.email}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(employee.email, "email")}
                                        className="text-(--text-muted) hover:text-(--text) cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={copiedField === "email" ? faCheck : faCopy} className={`h-3 w-3 ${copiedField === "email" ? "text-emerald-400" : ""}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Created At */}
                            <div className="flex items-center justify-between p-3.5">
                                <span className="text-xs text-(--text-muted) font-medium flex items-center gap-1.5">
                                    <FontAwesomeIcon icon={faCalendarDays} className="h-3.5 w-3.5 text-(--text-muted)" />
                                    Created At (createdAt)
                                </span>
                                <div className="text-right">
                                    <div className="font-medium text-(--text)">{formatDate(employee.createdAt)}</div>
                                    <div className="text-[11px] font-mono text-(--text-muted)">{employee.createdAt}</div>
                                </div>
                            </div>

                            {/* Updated At */}
                            <div className="flex items-center justify-between p-3.5">
                                <span className="text-xs text-(--text-muted) font-medium flex items-center gap-1.5">
                                    <FontAwesomeIcon icon={faClock} className="h-3.5 w-3.5 text-(--text-muted)" />
                                    Updated At (updatedAt)
                                </span>
                                <div className="text-right">
                                    <div className="font-medium text-(--text)">{formatDate(employee.updatedAt)}</div>
                                    <div className="text-[11px] font-mono text-(--text-muted)">{employee.updatedAt}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center justify-between border-t border-(--border) bg-(--surface-low) px-6 py-4">
                    <div className="flex items-center gap-2">
                        {onEdit && (
                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
                                    onEdit(employee);
                                }}
                                className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-4 py-2 text-xs font-semibold text-(--text) hover:bg-(--surface-high) transition-all cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className="h-3.5 w-3.5 text-(--primary)" />
                                <span>Edit Record</span>
                            </button>
                        )}
                        {onDelete && (
                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
                                    onDelete(employee);
                                }}
                                className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
                                <span>Delete</span>
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-(--primary) px-5 py-2 text-xs font-semibold text-(--on-primary) shadow-sm hover:opacity-90 transition-all cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetailModal;
