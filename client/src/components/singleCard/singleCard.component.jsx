/* eslint-disable react/prop-types */
import s from "./singleCard.module.css";
function SingleCard({driver}) {
  const { forename, surname, image, nationality, teams } = driver;

  return (
    <div className={s.CardContainer}>
      <h2>{`${forename} ${surname}`}</h2>
      <p>{`Nacionalidad: ${nationality}`}</p>
      <div className={s.cardImage}>
        <img src={image} alt="driver-image" />
      </div>
      <p>{`Escuderías: ${teams}`}</p>
    </div>
  );
}

export default SingleCard;
