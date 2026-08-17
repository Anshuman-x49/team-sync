import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faUserTie, faUser, faCrown } from "@fortawesome/free-solid-svg-icons";

interface RoleBadgeProps {
    role?: string;
    size?: "sm" | "md";
}

const RoleBadge = ({ role = "employee", size = "md" }: RoleBadgeProps) => {
    const normalized = (role || "employee").toLowerCase();

    let icon = faUser;
    let style = "bg-(--surface-high) text-(--text-muted) border-(--border)";

    if (normalized === "admin" || normalized === "superadmin") {
        icon = faShieldHalved;
        style = "bg-(--primary)/15 text-(--primary) border-(--primary)/30 font-semibold";
    } else if (normalized === "manager" || normalized === "lead") {
        icon = faCrown;
        style = "bg-amber-500/15 text-amber-300 border-amber-500/30";
    } else if (normalized === "contractor" || normalized === "intern") {
        icon = faUserTie;
        style = "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
    }

    const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-lg border uppercase tracking-wider transition-all ${style} ${sizeClasses}`}
        >
            <FontAwesomeIcon icon={icon} className="h-3 w-3 shrink-0" />
            <span className="capitalize">{role}</span>
        </span>
    );
};

export default RoleBadge;
