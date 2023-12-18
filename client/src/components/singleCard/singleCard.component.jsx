/* eslint-disable react/prop-types */
import s from "./singleCard.module.css";
function SingleCard({driver}) {
  const { forename, surname, image, nationality, teams } = driver;

  return (
    <div className={s.CardContainer}>
      <div className={s.cardImage}>
        <img src={image} alt="driver-image" />
      </div>
      <h3>{`${forename} ${surname}`}</h3>
      <p>{`Nacionalidad: ${nationality}`}</p>
      <p>{`Escuderías: ${teams}`}</p>
    </div>
  );
}

export default SingleCard;
