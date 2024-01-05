/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"; 

import s from "./navBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getLocalNationalities } from "../../redux/actions";
function NavBar({ onSearch, teams, teamsFilter, nationalityFilter, DBFilter, orderByName, orderByDOB, getAllDrivers, handleCreateButton }) {
  
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const localNationalities = useSelector((state) => state.localNationalities)

  useEffect(() => {
    dispatch(getLocalNationalities());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(name);
      setName("");
    }
  };

  const handleSubmit = () => {
    onSearch(name);
    setName("");
  }

  const handleSubmitAllDrivers = () => {    
    getAllDrivers();
  }
  
  const handleFilterByTeams = (e) => {
    teamsFilter(e.target.value)
  }

  const handleFilterByNationality = (e) => {
    nationalityFilter(e.target.value)
  }

  const handleFilterDB = (e) => {
    DBFilter(e.target.value)
  }

  const handleOrderByName = (e) => {
    orderByName(e.target.value)
  }

  const handleOrderByDOB = (e) => {
    orderByDOB(e.target.value)
  }

  return (
    <div className={s.navContainer}>
      <img src="/racingFlag.webp" alt="racingFlag" />
      <div className={s.searchContainer}>
        <div className={s.searchBar}>
          <input
            placeholder="Ingresa un nombre"
            type="text"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={name}
            className={s.searchInput}
          />
          <button type="submit" onClick={handleSubmit}>
            Buscar
          </button>
          <button type="submit" onClick={handleSubmitAllDrivers}>
            Todos
          </button>
          <button type="submit" onClick={handleCreateButton}>
            Crear nuevo
          </button>
        </div>
        <div className={s.filters}>
          <select onChange={handleFilterByNationality} defaultValue="">
            <option disabled value="">
              Filtra por nacionalidad
            </option>
            {localNationalities?.map((nationality, key) => (
              <option key={key} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
          <select onChange={handleFilterByTeams} defaultValue="">
            <option disabled value="">
              Filtra por escudería
            </option>
            {teams?.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <select onChange={handleFilterDB} defaultValue="">
            <option disabled value="">
              En Base de Datos
            </option>
            <option value="Y">Sí</option>
            <option value="N">No</option>
          </select>
          <select onChange={handleOrderByName} defaultValue="">
            <option disabled value="">
              Ordenar alfabéticamente
            </option>
            <option value="A">↧</option>
            <option value="D">↥</option>
          </select>
          <select onChange={handleOrderByDOB} defaultValue="">
            <option disabled value="">
              Ordenar por nacimiento
            </option>
            <option value="A">↧</option>
            <option value="D">↥</option>
          </select>
        </div>
      </div>
      <img className={s.rightFlag} src="/racingFlag.webp" alt="racingFlag" />
    </div>
  );
}

export default NavBar;
