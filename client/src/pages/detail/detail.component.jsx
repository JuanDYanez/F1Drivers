// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import { useParams } from "react-router-dom";
import s from "./detail.module.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Detail() {

  const { id } = useParams();
  const [driver, setDriver] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:3001/drivers/${id}`).then(
      ({ data }) => {
        setDriver(data);
      })
  }, [id]);


  return (
    <div className={s.MainContainer}>
      <div className={s.DetailContainer}>
        <NavLink to='/home' className={s.closeButton}>X</NavLink>
        <div className={s.leftColumn}>
          <img src={driver?.image} alt={driver?.forename} />
        </div>
        <div className={s.rightColumn}>
          <h2>{`${driver?.forename} ${driver?.surname}`}</h2>
          <p>Nacionalidad: {driver?.nationality}</p>
          <p>Escuderías: {driver?.teams}</p>
          <p>Nacimiento: {driver?.dob}</p>
          <p>{driver?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
