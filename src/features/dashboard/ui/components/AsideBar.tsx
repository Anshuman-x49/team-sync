import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store/store";
import { adminNavigations, employeeNavigations } from "../../../../app/constants/navigations";
import NavigationTab from "./NavigationTab";

const AsideBar = () => {

    const { employee } = useSelector((store: RootState) => store.auth);

    const navigations = employee?.role === "admin" ? adminNavigations : employeeNavigations;

    return (
        <aside className="flex h-screen w-70 shrink-0 flex-col justify-between border-r border-(--border) bg-(--surface-low) px-5 py-6 transition-colors">
            {/* Top Section: Brand + Navigation */}
            <div className="flex flex-col gap-6">
                {/* Brand */}
                <div className="px-2">
                    <h1 className="text-2xl font-bold tracking-tight text-(--primary)">
                        Team Sync
                    </h1>
                    <p className="mt-0.5 text-sm text-(--text-muted)">Enterprise Workspace</p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1.5">
                    {navigations.map((nav, index) => (
                        <NavigationTab key={index} {...nav} />
                    ))}
                </nav>
            </div>
        </aside>
    )
}

export default AsideBar