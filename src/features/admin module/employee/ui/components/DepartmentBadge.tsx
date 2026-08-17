import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCode,
    faUsers,
    faChartLine,
    faPalette,
    faCoins,
    faHeadset,
    faBuilding,
    faShieldCat,
    type IconDefinition
} from "@fortawesome/free-solid-svg-icons";

interface DepartmentBadgeProps {
    department?: string;
    showIcon?: boolean;
}

const getDepartmentConfig = (dept: string = ""): { icon: IconDefinition; color: string } => {
    const d = dept.toLowerCase();
    if (d.includes("dev") || d.includes("engineer") || d.includes("tech")) {
        return { icon: faCode, color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
    }
    if (d.includes("design") || d.includes("ui") || d.includes("ux")) {
        return { icon: faPalette, color: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20" };
    }
    if (d.includes("hr") || d.includes("people") || d.includes("human")) {
        return { icon: faUsers, color: "bg-violet-500/10 text-violet-400 border-violet-500/20" };
    }
    if (d.includes("market") || d.includes("sales") || d.includes("growth")) {
        return { icon: faChartLine, color: "bg-orange-500/10 text-orange-400 border-orange-500/20" };
    }
    if (d.includes("finance") || d.includes("account")) {
        return { icon: faCoins, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
    }
    if (d.includes("support") || d.includes("service")) {
        return { icon: faHeadset, color: "bg-sky-500/10 text-sky-400 border-sky-500/20" };
    }
    if (d.includes("security") || d.includes("qa")) {
        return { icon: faShieldCat, color: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
    }
    return { icon: faBuilding, color: "bg-(--surface-high) text-(--text-muted) border-(--border)" };
};

const DepartmentBadge = ({ department = "General", showIcon = true }: DepartmentBadgeProps) => {
    const { icon, color } = getDepartmentConfig(department);

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium capitalize transition-all ${color}`}
        >
            {showIcon && <FontAwesomeIcon icon={icon} className="h-3 w-3 shrink-0 opacity-80" />}
            <span>{department || "Unassigned"}</span>
        </span>
    );
};

export default DepartmentBadge;
