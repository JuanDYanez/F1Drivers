/* eslint-disable react/prop-types */
import { useState } from "react";

import s from "./navBar.module.css";
function NavBar({ onSearch, teams, teamsFilter, DBFilter, orderByName, orderByDOB, getAllDrivers }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
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
      <div className={s.searchBar}>
        <input
          placeholder="Ingresa un nombre"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={name}
        />
        <button type="submit" onClick={handleSubmit}>Buscar</button>
        <button type="submit" onClick={handleSubmitAllDrivers}>Todos</button>
      </div>
      <div className={s.filters}>
        <select onChange={handleFilterByTeams} defaultValue="">
          <option disabled value="" >Filtra por escudería</option>
          {teams?.map((team) => (
            <option key={team.id} value={team.name}>{team.name }</option>
          ))}
        </select>
        <select onChange={handleFilterDB} defaultValue="">
          <option disabled value="" >En Base de Datos</option>
          <option value="All" >Todos</option>
          <option value="Y" >Sí</option>
          <option value="N" >No</option>
        </select>
        <select onChange={handleOrderByName} defaultValue="">
          <option disabled value="" >Ordenar alfabéticamente</option>
          <option value="A" >↧</option>
          <option value="D" >↥</option>
        </select>
        <select onChange={handleOrderByDOB} defaultValue="">
          <option disabled value="" >Ordenar por nacimiento</option>
          <option value="A" >↧</option>
          <option value="D" >↥</option>
        </select>
      </div>
    </div>
  );
}

export default NavBar;
