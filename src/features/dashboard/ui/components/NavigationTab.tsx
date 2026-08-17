import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface NavigationTabProps {
    path: string;
    icon: IconDefinition;
    title: string;
}

const NavigationTab = ({ path, icon, title }: NavigationTabProps) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${isActive
                    ? "bg-(--primary) text-(--on-primary) shadow-sm"
                    : "text-(--text-muted) hover:bg-(--surface-high) hover:text-(--text)"
                }`
            }
            end
        >
            <span className="flex h-5 w-5 items-center justify-center shrink-0">
                <FontAwesomeIcon icon={icon} className="h-4 w-4" />
            </span>
            <span>{title}</span>
        </NavLink>
    );
};

export default NavigationTab;