/* eslint-disable react/prop-types */
import SingleCard from "../singleCard/singleCard.component.jsx";
import s from "./cardsContainer.module.css";

export default function CardsContainer({drivers}) {

  return (
    <div className={s.CardsContainer}>
      {drivers?.map((driver) => (
        <SingleCard driver={driver} key={ driver.id } />
      ))}
    </div>
  );
}
