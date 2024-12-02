import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageRange = () => {
    const range = [];
    const rangeSize = 3;
    let start = Math.max(1, currentPage - Math.floor(rangeSize / 2));
    const end = Math.min(totalPages, start + rangeSize - 1);

    if (end - start + 1 < rangeSize) {
      start = Math.max(1, end - rangeSize + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = getPageRange();

  const renderPageNumbers = () => {
    return pageRange.map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`px-3 py-2 rounded-md ${
          currentPage === page
            ? "bg-primaryLight text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        aria-current={currentPage === page ? "page" : undefined}
      >
        {page}
      </button>
    ));
  };

  return (
    <nav
      className="flex items-center justify-center space-x-2"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Ir a la primera página"
      >
        &laquo;
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Ir a la página anterior"
      >
        &lsaquo;
      </button>

      {pageRange[0] > 1 && <span className="px-3 py-2">...</span>}

      {renderPageNumbers()}

      {pageRange[pageRange.length - 1] < totalPages && (
        <span className="px-3 py-2">...</span>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Ir a la página siguiente"
      >
        &rsaquo;
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Ir a la última página"
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
