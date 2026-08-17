import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faPenToSquare,
    faTrashCan,
    faCopy,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import type { Employee } from "../../hooks/useEmployee";
import StatusBadge from "./StatusBadge";
import RoleBadge from "./RoleBadge";
import DepartmentBadge from "./DepartmentBadge";
import EmployeeAvatar from "./EmployeeAvatar";

interface EmployeeTableProps {
    employees: Employee[];
    onView: (employee: Employee) => void;
    onEdit: (employee: Employee) => void;
    onDelete: (employee: Employee) => void;
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

const EmployeeTable = ({
    employees,
    onView,
    onEdit,
    onDelete,
}: EmployeeTableProps) => {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopyId = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-sm w-full max-w-full">
            <div className="overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden w-full max-w-full">
                <table className="w-full min-w-175 text-left text-sm">
                    {/* Table Header */}
                    <thead className="border-b border-(--border) bg-(--surface-low) text-xs uppercase tracking-wider text-(--text-muted)">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-semibold">
                                Employee
                            </th>
                            <th scope="col" className="px-6 py-4 font-semibold">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-4 font-semibold">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-4 font-semibold">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4 font-semibold">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-4 font-semibold">
                                Joined Date
                            </th>
                            <th scope="col" className="px-6 py-4 font-semibold text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-(--border)">
                        {employees.map((employee) => (
                            <tr
                                key={employee._id}
                                onClick={() => onView(employee)}
                                className="group transition-colors hover:bg-(--surface-high)/50 cursor-pointer"
                            >
                                {/* Name & Avatar */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <EmployeeAvatar
                                            avatar={employee.avatar}
                                            name={employee.name}
                                            size="md"
                                        />
                                        <div>
                                            <div className="font-semibold text-(--text) group-hover:text-(--primary) transition-colors">
                                                {employee.name || "Unnamed"}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-(--text-muted)">
                                                <span className="font-mono text-[11px]">
                                                    ID: #{employee._id ? employee._id.slice(-6) : "------"}
                                                </span>
                                                {employee._id && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleCopyId(e, employee._id)}
                                                        title="Copy full ID"
                                                        className="hover:text-(--text) cursor-pointer p-0.5"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={copiedId === employee._id ? faCheck : faCopy}
                                                            className={`h-2.5 w-2.5 ${
                                                                copiedId === employee._id ? "text-emerald-400" : ""
                                                            }`}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Department */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <DepartmentBadge department={employee.department} />
                                </td>

                                {/* Role */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <RoleBadge role={employee.role} size="sm" />
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={employee.status} size="sm" />
                                </td>

                                {/* Email */}
                                <td className="px-6 py-4 whitespace-nowrap text-xs text-(--text-muted)">
                                    {employee.email || "—"}
                                </td>

                                {/* CreatedAt */}
                                <td className="px-6 py-4 whitespace-nowrap text-xs text-(--text-muted)">
                                    {formatDate(employee.createdAt)}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onView(employee);
                                            }}
                                            title="View Details"
                                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-(--border) bg-(--surface-low) text-(--text-muted) transition-all hover:border-(--primary) hover:text-(--primary) hover:bg-(--surface-high) cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faEye} className="h-3.5 w-3.5" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit(employee);
                                            }}
                                            title="Edit Employee"
                                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-(--border) bg-(--surface-low) text-(--text-muted) transition-all hover:border-(--primary) hover:text-(--text) hover:bg-(--surface-high) cursor-pointer"
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
                                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 transition-all hover:bg-rose-500/20 cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
