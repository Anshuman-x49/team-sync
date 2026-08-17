import { useState } from "react";

interface EmployeeAvatarProps {
    avatar?: string;
    name?: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

const GRADIENT_PALETTES = [
    "from-purple-600 to-indigo-600 text-white",
    "from-blue-600 to-cyan-600 text-white",
    "from-emerald-600 to-teal-600 text-white",
    "from-rose-600 to-pink-600 text-white",
    "from-amber-600 to-orange-600 text-white",
    "from-violet-600 to-fuchsia-600 text-white",
];

const getInitials = (name: string = "") => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0 || !parts[0]) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getGradientForName = (name: string = "") => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % GRADIENT_PALETTES.length;
    return GRADIENT_PALETTES[index];
};

const sizeMap = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm font-semibold",
    lg: "h-16 w-16 text-lg font-bold",
    xl: "h-24 w-24 text-2xl font-bold",
};

const EmployeeAvatar = ({
    avatar,
    name = "",
    size = "md",
    className = "",
}: EmployeeAvatarProps) => {
    const [imageError, setImageError] = useState(false);
    const initials = getInitials(name);
    const gradient = getGradientForName(name);
    const hasImage = Boolean(avatar && avatar.trim() !== "" && !imageError);

    return (
        <div className={`relative inline-flex shrink-0 ${className}`}>
            <div
                className={`overflow-hidden rounded-2xl ring-1 ring-(--border) shadow-inner flex items-center justify-center select-none transition-transform ${sizeMap[size]}`}
            >
                {hasImage ? (
                    <img
                        src={avatar}
                        alt={name || "Employee"}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div
                        className={`h-full w-full flex items-center justify-center bg-linear-to-br ${gradient}`}
                    >
                        <span>{initials}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeAvatar;
