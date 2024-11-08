import { router } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    const SIBLINGS_COUNT = 1;
    const BOUNDARIES_COUNT = 1;

    const handlePageClick = (url) => {
        if (url) {
            router.get(url, {}, {
                preserveScroll: true,
                preserveState: true
            });
        }
    };

    const getVisiblePageLinks = () => {
        const innerLinks = links.slice(1, -1);
        const totalPages = innerLinks.length;

        if (totalPages <= 7) return innerLinks;

        const currentPage = innerLinks.findIndex(link => link.active) + 1;

        const createEllipsis = () => ({ label: '...', url: null });
        const getPageRange = (start, end) =>
            innerLinks.slice(start - 1, end);

        const leftBoundary = getPageRange(1, BOUNDARIES_COUNT);
        const rightBoundary = getPageRange(totalPages - BOUNDARIES_COUNT + 1, totalPages);

        const siblingStart = Math.max(
            BOUNDARIES_COUNT + 1,
            currentPage - SIBLINGS_COUNT
        );

        const siblingEnd = Math.min(
            totalPages - BOUNDARIES_COUNT,
            currentPage + SIBLINGS_COUNT
        );

        const shouldShowLeftEllipsis = siblingStart > BOUNDARIES_COUNT + 2;
        const shouldShowRightEllipsis = siblingEnd < totalPages - BOUNDARIES_COUNT - 1;

        const visibleRange = getPageRange(
            shouldShowLeftEllipsis ? siblingStart : BOUNDARIES_COUNT + 1,
            shouldShowRightEllipsis ? siblingEnd + 1 : totalPages - BOUNDARIES_COUNT
        );

        return [
            ...leftBoundary,
            shouldShowLeftEllipsis ? createEllipsis() : null,
            ...visibleRange,
            shouldShowRightEllipsis ? createEllipsis() : null,
            ...rightBoundary
        ].filter(Boolean);
    };

    const buttonBaseClass = "min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none";
    const arrowButtonClass = "p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none";

    return (
        <div className="py-1 px-4">
            <nav className="flex justify-center space-x-1">
                <div className="flex">

                    <button
                        type="button"
                        className={arrowButtonClass}
                        onClick={() => handlePageClick(links[0].url)}
                        disabled={!links[0].url}
                    >
                        <span>«</span>
                    </button>

                    {getVisiblePageLinks().map((link, index) => (
                        <button
                            key={`${link.label}-${index}`}
                            type="button"
                            className={`${buttonBaseClass} ${
                                link.active ? 'bg-green-500 text-white' : ''
                            }`}
                            aria-current={link.active ? 'page' : undefined}
                            onClick={() => handlePageClick(link.url)}
                            disabled={!link.url}
                        >
                            {link.label}
                        </button>
                    ))}

                    <button
                        type="button"
                        className={arrowButtonClass}
                        onClick={() => handlePageClick(links[links.length - 1].url)}
                        disabled={!links[links.length - 1].url}
                    >
                        <span>»</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
