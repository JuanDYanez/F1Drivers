/* eslint-disable react/prop-types */
import s from "./pagination.module.css";

function Pagination({onNextPage, onPreviousPage, showPageNumbers, pageNumbers, currentPage}) {
  return (
    <div className={s.pagination}>
      <button disabled={currentPage === 1 ? true : false} onClick={onPreviousPage}><img className={ s.leftArrow } src={ currentPage === 1 ? "/arrowOff.png" : "/arrowOn.png"}  alt="arrow"/></button>
      <div>{showPageNumbers()}</div>
      <button disabled={ currentPage >= pageNumbers.length ? true : false} onClick={onNextPage}><img className={ s.rightArrow } src={currentPage >= pageNumbers.length ? "/arrowOff.png" : "/arrowOn.png" } alt="arrow"/></button>
    </div>
  );
}


export default Pagination;
