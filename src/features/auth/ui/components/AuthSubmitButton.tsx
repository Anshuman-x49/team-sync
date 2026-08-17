import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AuthSubmitButtonProps {
    label: string;
    icon?: IconDefinition;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const AuthSubmitButton = ({
    label,
    icon,
    disabled = false,
    className = "",
    onClick,
}: AuthSubmitButtonProps) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            onClick={onClick}
            className={`flex w-full items-center justify-center gap-2 rounded-lg bg-(--primary) py-3.5 text-sm font-semibold text-(--on-primary) shadow-lg transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 ${className}`}
        >
            <span>{label}</span>
            {icon && <FontAwesomeIcon icon={icon} className="text-sm" />}
        </button>
    );
};

export default AuthSubmitButton;
