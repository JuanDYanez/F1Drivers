/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import s from "./singleCard.module.css";
function SingleCard({driver}) {
  const { id, forename, surname, image, teams } = driver;

  return (
    <NavLink className={s.CardContainer} to={`/driver/${id}`}>
      <div>
        <div className={s.cardImage}>
          <img src={image} alt="driver-image" />
        </div>
        <div className={s.cardHeader}>
          <h4>{`${forename} ${surname}`}</h4>
        </div>
        <p className={s.teamsTitle}>Escuderías</p>
        <p className={s.teams}>{teams}</p>
      </div>
    </NavLink>
  );
}

export default SingleCard;
