/* eslint-disable react/prop-types */
import s from "./pagination.module.css";
function Pagination({driversPerPage, currentPage, setCurrentPage, totalDrivers}) {

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalDrivers / driversPerPage); i++) {
    pageNumbers.push(i)
  }

  const onPreviousPage = () => {
      setCurrentPage(currentPage - 1)
  }

  const onNextPage = () => {
    setCurrentPage(currentPage+1)
  }

  const onSpecificPage = (e) => {
    setCurrentPage(e)
  }

  const showPageNumbers = () => {
    const displayPages = []
    const totalPages = pageNumbers.length
    const maxPagesToShow = 3

    if (totalPages <= maxPagesToShow) {
      displayPages.push(...pageNumbers)
    } else {
      const startPage = Math.max(1, currentPage);
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages)

    if (startPage > 1) {
      displayPages.push(1);
      displayPages.push(null);
  }

      for (let i = startPage; i <= endPage; i++) {
        displayPages.push(i)
      }

      if (endPage < totalPages) {
        displayPages.push(null)
        displayPages.push(totalPages)
      }
    }
    
    return displayPages.map((page, index) => (
      <li key={index}>
        {page === null
          ? (<span>---</span>)
          : (
            <a className={page === currentPage ? s.active : ""} onClick={() => onSpecificPage(page)}>{ page }</a>
          )}
      </li>
    ))
  }

  return (
    <div className={s.pagination}>
      <button disabled={ currentPage === 1 ? true : false} onClick={onPreviousPage}>←</button>
        <div className={s.paginationPages}>{ showPageNumbers()}</div>
        {/* {pageNumbers.map((page) => (
          <li key={page}>
            <a onClick={() => onSpecificPage(page)}>{page}</a>
          </li>
        ))} */}
      <button disabled={ currentPage >= pageNumbers.length ? true : false}onClick={onNextPage}>→</button>
    </div>
  );
  }


export default Pagination;
