import type { ViewMode } from "../../hooks/useEmployee";

interface EmployeeSkeletonLoaderProps {
    viewMode?: ViewMode;
    count?: number;
}

const EmployeeSkeletonLoader = ({
    viewMode = "grid",
    count = 6,
}: EmployeeSkeletonLoaderProps) => {
    const items = Array.from({ length: count });

    if (viewMode === "table") {
        return (
            <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-sm animate-pulse">
                <div className="p-4 border-b border-(--border) bg-(--surface-low) h-12" />
                <div className="divide-y divide-(--border)">
                    {items.map((_, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-2xl bg-(--surface-high)" />
                                <div className="space-y-2">
                                    <div className="h-4 w-32 rounded bg-(--surface-high)" />
                                    <div className="h-3 w-20 rounded bg-(--surface-low)" />
                                </div>
                            </div>
                            <div className="h-6 w-20 rounded bg-(--surface-high)" />
                            <div className="h-6 w-16 rounded bg-(--surface-high)" />
                            <div className="h-6 w-24 rounded bg-(--surface-high)" />
                            <div className="h-8 w-24 rounded-xl bg-(--surface-high)" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((_, idx) => (
                <div
                    key={idx}
                    className="flex flex-col justify-between rounded-2xl border border-(--border) bg-(--surface) p-5 animate-pulse space-y-4"
                >
                    <div className="flex items-start justify-between">
                        <div className="h-14 w-14 rounded-2xl bg-(--surface-high)" />
                        <div className="space-y-2 flex flex-col items-end">
                            <div className="h-5 w-16 rounded-full bg-(--surface-high)" />
                            <div className="h-4 w-12 rounded bg-(--surface-high)" />
                        </div>
                    </div>

                    <div className="space-y-2 pt-2">
                        <div className="h-5 w-3/4 rounded bg-(--surface-high)" />
                        <div className="h-4 w-1/2 rounded bg-(--surface-low)" />
                    </div>

                    <div className="h-10 w-full rounded-xl bg-(--surface-low) pt-2" />

                    <div className="flex items-center gap-2 pt-2">
                        <div className="h-8 flex-1 rounded-xl bg-(--surface-high)" />
                        <div className="h-8 w-8 rounded-xl bg-(--surface-high)" />
                        <div className="h-8 w-8 rounded-xl bg-(--surface-high)" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmployeeSkeletonLoader;
