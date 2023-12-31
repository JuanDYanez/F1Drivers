/* eslint-disable react/prop-types */
import { useState } from "react"; 

import s from "./navBar.module.css";
function NavBar({ onSearch, teams, teamsFilter, DBFilter, orderByName, orderByDOB, getAllDrivers, handleCreateButton, handleCloseForm }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(name);
      setName("");

      handleCloseForm();
    }
  };

  const handleSubmit = () => {
    onSearch(name);
    setName("");

    handleCloseForm();
  }

  const handleSubmitAllDrivers = () => {
    getAllDrivers();

    handleCloseForm();
  }
  
  const handleFilterByTeams = (e) => {
    teamsFilter(e.target.value)

    handleCloseForm();
  }

  const handleFilterDB = (e) => {
    DBFilter(e.target.value)

    handleCloseForm();
  }

  const handleOrderByName = (e) => {
    orderByName(e.target.value)

    handleCloseForm()
  }

  const handleOrderByDOB = (e) => {
    orderByDOB(e.target.value)

    handleCloseForm();
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
        <button type="submit" onClick={handleCreateButton}>Crear</button>
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
