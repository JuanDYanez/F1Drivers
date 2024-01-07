/* eslint-disable react/prop-types */

import SingleCard from "../singleCard/singleCard.component.jsx";
import Pagination from "../../components/pagination/pagination.component.jsx";

import s from "./cardsContainer.module.css";
import { useEffect, useState } from "react";

export default function CardsContainer({drivers}) {
  const driversPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * driversPerPage  
  const firstIndex = lastIndex - driversPerPage  

  const pageNumbers = [];
  const totalDrivers = drivers.length;

  useEffect(() => {
    setCurrentPage(1)
  }, [drivers])
  
  for (let i = 1; i <= Math.ceil(totalDrivers / driversPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onSpecificPage = (page) => {
    setCurrentPage(page);
  };

  const showPageNumbers = () => {
    const displayPages = [];
    const totalPages = pageNumbers.length;
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow) {
      displayPages.push(...pageNumbers);
    } else {
      const startPage = Math.max(1, currentPage);
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      if (startPage > 1) {
        displayPages.push(1);
        displayPages.push(null);
      }

      for (let i = startPage; i <= endPage; i++) {
        displayPages.push(i);
      }

      if (endPage < totalPages) {
        displayPages.push(null);
        displayPages.push(totalPages);
      }
    }

    return displayPages.map((page, index) => (
      <li key={index}>
        {page === null ? (
          <span> </span>
        ) : (
          <a
            className={page === currentPage ? s.activePage : s.regularPage}
            onClick={() => onSpecificPage(page)}
          >
            {page}
          </a>
        )}
      </li>
    ));
  };


  return (
    <div className={s.MainContainer}>
      <div className={s.CardsContainer}>
        {drivers?.map((driver) => (
          <SingleCard driver={driver} key={driver.id} />
        )).slice(firstIndex, lastIndex)}
      </div>
      <Pagination showPageNumbers={showPageNumbers} onNextPage={onNextPage} onPreviousPage={onPreviousPage} pageNumbers={pageNumbers} currentPage={currentPage} driversPerPage={driversPerPage} drivers={drivers} />
    </div>
  );
}
