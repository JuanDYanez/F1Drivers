// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import { useParams } from "react-router-dom";
import s from "./detail.module.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getNationalityFlag, clearNationalityFlag } from '../../redux/actions.js';

function Detail() {
  const { id } = useParams();
  const [driver, setDriver] = useState({})

  const dispatch = useDispatch()

  const nationalityFlag = useSelector((state) => state.nationalityFlag);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/drivers/${id}`);
        setDriver(data);

        dispatch(getNationalityFlag(id));
      } catch (error) {
        console.error(error);
      }
    }

    fetchDriverData();
    
    return () => {
      dispatch(clearNationalityFlag());
    };
  }, [id]);

  const DBteamsToString = () => {

    if (driver.createdInDB === true) {
      return driver.Teams.map((team) => team.name).join(', ');
    }
    
    if (driver.createdInDB === false) {
      return driver.teams
    }
  }
  

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
          {nationalityFlag && <img className={s.flag} src={nationalityFlag} alt={driver?.nationality}/>}
          <p>Escuderías: {DBteamsToString()}</p>
          <p>Nacimiento: {driver?.dob}</p>
          <p>{driver?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
