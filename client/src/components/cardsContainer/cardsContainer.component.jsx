/* eslint-disable react/prop-types */
import { useState } from "react";

import SingleCard from "../singleCard/singleCard.component.jsx";
import Pagination from "../../components/pagination/pagination.component.jsx";

import s from "./cardsContainer.module.css";

export default function CardsContainer({drivers}) {
  const [driversPerPage, setDriversPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * driversPerPage
  const firstIndex = lastIndex - driversPerPage


  const totalDrivers = drivers.length
  
  return (
    <div className={s.MainContainer}>
      <div className={s.CardsContainer}>
        {drivers?.map((driver) => (
          <SingleCard driver={driver} key={driver.id} />
        )).slice(firstIndex, lastIndex)}
      </div>
      <Pagination driversPerPage={driversPerPage} currentPage={ currentPage } setCurrentPage={setCurrentPage} totalDrivers={totalDrivers} />
    </div>
  );
}
