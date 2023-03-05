
const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  const pageNumbers = [currentPage-1,currentPage,currentPage+1]

  return (
    <nav className="flex justify-center">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            className={`px-2 py-1 rounded-md ${
              currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            }`}
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`px-2 py-1 rounded-md ${
                currentPage === number ? "bg-gray-400 text-white" : "bg-white"
              }`}
              onClick={() => onChangePage(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`px-2 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white"
            }`}
            onClick={() => onChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
