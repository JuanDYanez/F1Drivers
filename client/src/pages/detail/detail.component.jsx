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

  const DBteamsToString = () => {

    if (driver.createdInDB === true) {
      return driver.Teams.map((team) => team.name).join(', ');
    }
    
    if (driver.createdInDB === false) {
      return driver.teams
    }
  }

  console.log(DBteamsToString())


  // const DBTeamsToString = () => {
  //   if (driver.createdInDB === true) {

  //     const teamsToString = driver.Teams.map(team => team.name)
      
  //     return {
  //       ...driver,
  //       Teams: driver.teams,
  //     }
  //   }


  //   if (driver.createdInDB === true) {
  //     return {
  //       ...driver,
  //       teams: driver.Teams.map(team => team.name).join(", "),
  //     }
  //   }
    
  //     return driver;
  // };


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
          <p>Escuderías: {DBteamsToString()}</p>
          <p>Nacimiento: {driver?.dob}</p>
          <p>{driver?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
