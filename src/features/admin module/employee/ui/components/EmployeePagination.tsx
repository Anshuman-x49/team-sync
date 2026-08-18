import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
    faRotate,
} from "@fortawesome/free-solid-svg-icons";

interface EmployeePaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    isPlaceholderData?: boolean;
}

const EmployeePagination = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    isPlaceholderData = false,
}: EmployeePaginationProps) => {
    if (totalItems === 0) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Generate visible page numbers for large dataset (e.g. 130+ items)
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push("ellipsis-start");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }

            if (currentPage < totalPages - 2) {
                pages.push("ellipsis-end");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-(--border) bg-(--surface) p-4 shadow-sm">
            {/* Left: Summary text & caching status */}
            <div className="flex items-center gap-3 text-xs text-(--text-muted)">
                <span>
                    Showing <strong className="font-semibold text-(--text)">{startItem}</strong> to{" "}
                    <strong className="font-semibold text-(--text)">{endItem}</strong> of{" "}
                    <strong className="font-semibold text-(--text)">{totalItems}</strong> employees
                </span>

                {isPlaceholderData && (
                    <span className="flex items-center gap-1.5 rounded-full bg-(--primary)/15 px-2.5 py-0.5 text-[11px] font-medium text-(--primary) border border-(--primary)/20 animate-pulse">
                        <FontAwesomeIcon icon={faRotate} className="h-3 w-3 animate-spin" />
                        <span>Caching...</span>
                    </span>
                )}
            </div>

            {/* Right: Page numbers & Next/Prev Controls */}
            <div className="flex items-center gap-1">
                {/* Previous Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--border) bg-(--surface-low) text-(--text-muted) transition-all hover:border-(--primary) hover:text-(--text) hover:bg-(--surface-high) cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Previous page"
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="h-3.5 w-3.5" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((item, index) => {
                    if (typeof item === "string") {
                        return (
                            <span
                                key={`${item}-${index}`}
                                className="flex h-9 w-7 items-center justify-center text-xs text-(--text-muted)"
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive = item === currentPage;
                    return (
                        <button
                            key={`page-${item}`}
                            type="button"
                            onClick={() => onPageChange(item)}
                            className={`flex h-9 min-w-9 px-3 items-center justify-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                isActive
                                    ? "bg-(--primary) text-(--on-primary) shadow-sm"
                                    : "border border-(--border) bg-(--surface-low) text-(--text-muted) hover:text-(--text) hover:bg-(--surface-high)"
                            }`}
                        >
                            {item}
                        </button>
                    );
                })}

                {/* Next Button */}
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--border) bg-(--surface-low) text-(--text-muted) transition-all hover:border-(--primary) hover:text-(--text) hover:bg-(--surface-high) cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Next page"
                >
                    <FontAwesomeIcon icon={faChevronRight} className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
};

export default EmployeePagination;
