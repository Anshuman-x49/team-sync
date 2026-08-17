import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faClock, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

interface StatusBadgeProps {
    status?: string;
    size?: "sm" | "md";
}

const StatusBadge = ({ status = "active", size = "md" }: StatusBadgeProps) => {
    const normalized = (status || "active").toLowerCase();

    let config = {
        label: "Active",
        bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: faCircleCheck,
    };

    if (normalized === "inactive") {
        config = {
            label: "Inactive",
            bg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
            icon: faCircleXmark,
        };
    } else if (normalized === "on_leave" || normalized === "leave" || normalized === "pending") {
        config = {
            label: "On Leave",
            bg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            icon: faClock,
        };
    } else if (normalized !== "active") {
        config = {
            label: status,
            bg: "bg-(--surface-high) text-(--text-muted) border-(--border)",
            icon: faCircleQuestion,
        };
    }

    const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border font-medium capitalize tracking-wide transition-all ${config.bg} ${sizeClasses}`}
        >
            <FontAwesomeIcon icon={config.icon} className="h-3 w-3 opacity-80" />
            <span>{config.label}</span>
        </span>
    );
};

export default StatusBadge;
