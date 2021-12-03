interface PaginationProp {
  blockSize: number;
  totalPages: number;
  currentPage: number;
  onPageChanged?: (pageNo: number) => void;
}


const Pagination = ({
  blockSize,
  totalPages,
  currentPage,
  onPageChanged,
}: PaginationProp) => {
 
  let currentBlock = Math.floor(currentPage / blockSize);

  
  return (
    <nav>
      <ul className="pagination">
        {}
        {currentBlock !== 0 && (
          <li className="page-item">
            <a
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                onPageChanged && onPageChanged(currentBlock * blockSize - 1);
              }}
              href="!#"
            >
              PREV
            </a>
          </li>
        )}
        {}
        {}
        {}
        {Array.from(
          Array(
            totalPages - currentBlock * blockSize < blockSize
              ? totalPages - currentBlock * blockSize
              : blockSize
          ).keys()
        )
         
          .map((index) => currentBlock * blockSize + index)
          .map((num) => (
            <li
              className={`page-item ${currentPage === num ? "active" : ""}`}
              key={`page-${currentBlock * blockSize + num}`}
            >
              <a
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChanged && onPageChanged(num);
                }}
                href="!#"
              >
                {num + 1}
              </a>
            </li>
          ))}
        {}
        {}
        {totalPages - currentBlock * blockSize > blockSize && (
          <li className="page-item">
            <a
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                onPageChanged &&
                  onPageChanged(currentBlock * blockSize + blockSize);
              }}
              href="!#"
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
