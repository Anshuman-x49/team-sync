import { faBell, faGripVertical, faMagnifyingGlass, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../shared/state/themeSlice";
import type { RootState } from "../../../../app/store/store";

const Navbar = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const { mode } = useSelector((state: RootState) => state.theme);

    return (
        <header className="flex h-18 w-full items-center gap-6 border-b border-(--border) bg-(--surface) px-8 transition-colors">
            {/* Search */}
            <div className="relative w-full max-w-md">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-muted)"
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search workspace..."
                    className="w-full rounded-xl border border-(--border) bg-(--surface-low) py-2.5 pl-11 pr-4 text-sm text-(--text) placeholder:text-(--text-muted) outline-none transition-colors focus:border-(--primary) focus:bg-(--surface-high)"
                />
            </div>

            {/* Right cluster */}
            <div className="ml-auto flex items-center gap-5">
                {/* Theme Toggle */}
                <button
                    type="button"
                    aria-label="Toggle theme"
                    onClick={() => dispatch(toggleTheme())}
                    className="text-(--text-muted) transition-colors hover:text-(--text) cursor-pointer"
                >
                    <FontAwesomeIcon icon={mode === "dark" ? faSun : faMoon} className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative text-(--text-muted) transition-colors hover:text-(--text)"
                >
                    <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    aria-label="Apps"
                    className="text-(--text-muted) transition-colors hover:text-(--text)"
                >
                    <FontAwesomeIcon icon={faGripVertical} className="h-5 w-5 rotate-90" />
                </button>

                <button
                    type="button"
                    aria-label="Account"
                    className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-(--border) transition-shadow hover:ring-(--primary)"
                >
                    <div className="flex h-full w-full items-center justify-center bg-(--surface-high) text-xs font-semibold text-(--text)">
                        U
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Navbar