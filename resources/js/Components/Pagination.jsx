import { Link } from '@inertiajs/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';

export default function Pagination({ links }) {
    // Don't render pagination if there's only 1 page
    if (links.length <= 3) return null;

    // Find current page and last page
    const currentPageIndex = links.findIndex(link => link.active);
    const currentPage = parseInt(links[currentPageIndex].label);
    const lastPage = parseInt(links[links.length - 2].label);

    // Calculate which page numbers to show
    const getVisiblePages = () => {
        let pages = [];

        // If total pages are 5 or less, show all pages
        if (lastPage <= 5) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
            return pages;
        }

        // Always add first page
        pages.push(1);

        // If current page is 1 or 2
        if (currentPage <= 2) {
            pages.push(2);
            if (currentPage === 2) pages.push(3);
            pages.push('...');
            pages.push(lastPage);
            return pages;
        }

        // If current page is last or second-to-last or third-to-last
        if (currentPage > lastPage - 2) {
            pages.push('...');
            pages.push(lastPage - 2);
            pages.push(lastPage - 1);
            pages.push(lastPage);
            return pages;
        }

        // Current page is in the middle
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(lastPage);

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex flex-wrap items-center justify-between px-4 py-3 sm:px-6 border-t border-gray-200">
            {/* Mobile view */}
            <div className="flex justify-between w-full sm:hidden">
                <Link
                    href={links[0].url}
                    preserveScroll
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        links[0].url
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            : 'text-gray-300 bg-gray-50 border border-gray-200 cursor-not-allowed'
                    }`}
                >
                    <Icon path={mdiChevronLeft} size={0.8} />
                    <span className="ml-1">Previous</span>
                </Link>
                <Link
                    href={links[links.length - 1].url}
                    preserveScroll
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        links[links.length - 1].url
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            : 'text-gray-300 bg-gray-50 border border-gray-200 cursor-not-allowed'
                    }`}
                >
                    <span className="mr-1">Next</span>
                    <Icon path={mdiChevronRight} size={0.8} />
                </Link>
            </div>

            {/* Desktop view */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{lastPage}</span>
                    </p>
                </div>

                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {/* Previous Page Button */}
                    <Link
                        href={links[0].url}
                        preserveScroll
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${
                            links[0].url
                                ? 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                                : 'text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed'
                        }`}
                    >
                        <span className="sr-only">Previous</span>
                        <Icon path={mdiChevronLeft} size={0.8} />
                    </Link>

                    {/* Page Numbers */}
                    {visiblePages.map((page, index) => (
                        <div key={index}>
                            {page === '...' ? (
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    ···
                                </span>
                            ) : (
                                <Link
                                    href={links.find(link => link.label == page)?.url}
                                    preserveScroll
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                        currentPage === page
                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </Link>
                            )}
                        </div>
                    ))}

                    {/* Next Page Button */}
                    <Link
                        href={links[links.length - 1].url}
                        preserveScroll
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${
                            links[links.length - 1].url
                                ? 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                                : 'text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed'
                        }`}
                    >
                        <span className="sr-only">Next</span>
                        <Icon path={mdiChevronRight} size={0.8} />
                    </Link>
                </nav>
            </div>
        </div>
    );
}
