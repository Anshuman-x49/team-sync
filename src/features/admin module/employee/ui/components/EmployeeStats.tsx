import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faUserCheck,
    faBuilding,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import type { Employee } from "../../hooks/useEmployee";

interface EmployeeStatsProps {
    employees: Employee[];
}

const EmployeeStats = ({ employees }: EmployeeStatsProps) => {
    const total = employees.length;
    const activeNow = employees.filter(
        (e) => (e.status || "active").toLowerCase() === "active"
    ).length;
    
    // Unique departments count
    const departmentCount = new Set(
        employees.map((e) => (e.department || "").toLowerCase()).filter(Boolean)
    ).size;

    // New hires: added within last 30 days (or fallback to recent records)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newHires = employees.filter((e) => {
        if (!e.createdAt) return false;
        try {
            return new Date(e.createdAt) >= thirtyDaysAgo;
        } catch {
            return false;
        }
    }).length;

    const stats = [
        {
            title: "Total Employee",
            value: total,
            subtitle: "Total registered workforce",
            icon: faUsers,
            badge: `${total} members`,
            gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
            iconColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
        },
        {
            title: "Active Now",
            value: activeNow,
            subtitle: `${total > 0 ? Math.round((activeNow / total) * 100) : 0}% active rate`,
            icon: faUserCheck,
            badge: "Online & Working",
            gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
            iconColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        },
        {
            title: "Department",
            value: departmentCount,
            subtitle: "Active operational teams",
            icon: faBuilding,
            badge: `${departmentCount} teams`,
            gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
            iconColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
        },
        {
            title: "New Hires",
            value: newHires,
            subtitle: "Joined in last 30 days",
            icon: faUserPlus,
            badge: "Recent recruits",
            gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
            iconColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="relative overflow-hidden rounded-2xl border border-(--border) bg-(--surface) p-5"
                >
                    {/* Background Subtle Gradient */}
                    <div
                        className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-50`}
                    />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
                                {stat.title}
                            </span>
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl border ${stat.iconColor}`}
                            >
                                <FontAwesomeIcon icon={stat.icon} className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="mt-3 flex items-baseline justify-between">
                            <span className="text-3xl font-extrabold tracking-tight text-(--text)">
                                {stat.value}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-(--surface-high) px-2.5 py-0.5 text-[11px] font-medium text-(--text-muted) border border-(--border)">
                                {stat.badge}
                            </span>
                        </div>

                        <p className="mt-1.5 text-xs text-(--text-muted)">{stat.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmployeeStats;
