import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialButtonProps {
    label: string;
    icon: IconDefinition;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
}

const SocialButton = ({
    label,
    icon,
    onClick,
    className = "",
    type = "button",
}: SocialButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`group flex items-center justify-center gap-2 rounded-lg border border-(--border) bg-(--surface-high) px-4 py-3 text-sm transition-colors hover:bg-(--surface) ${className}`}
        >
            <FontAwesomeIcon
                icon={icon}
                className="text-sm text-(--text-muted) group-hover:text-(--text) transition-colors"
            />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-(--text)">
                {label}
            </span>
        </button>
    );
};

export default SocialButton;
