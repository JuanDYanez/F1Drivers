import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getDriverByName, getTeams, filterByTeams, createdInDB, setOrderByName, setOrderByDOB, getNationalities, cleanFilteredDrivers, cleanShowNotFound } from "../../redux/actions.js";

import CardsContainer from "../../components/cardsContainer/cardsContainer.component.jsx";
import NavBar from "../../components/navBar/navBar.component.jsx";
import CreateForm from "../createForm/createForm.component.jsx";
import DriverNotFound from "../../components/driverNotFound/driverNotFound.component.jsx";


import s from "./home.module.css";

function Home() {

  const dispatch = useDispatch();
  
  const [searched, setSearched] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const showNotFound = useSelector((state) => state.showNotFound)

  const drivers = useSelector((state) => state.drivers);
  const filteredDrivers = useSelector((state) => state.filteredDrivers);
  const teams = useSelector((state) => state.teams);

  function onSearch(name) {
    if (name) {
      dispatch(cleanFilteredDrivers())
      dispatch(getDriverByName(name));
      setSearched(true)
    } else {
      setSearched(false)
    }
  }

  function submitAllDrivers () {
    dispatch(cleanFilteredDrivers())
    dispatch(getDrivers());
    dispatch(cleanShowNotFound())
    setSearched(false)

  }

  function filterByTeam(team) {
    if (team) {
      dispatch(filterByTeams(team))
      setSearched(true)
    } else {
      setSearched(false)
    }
  }

  function filterByDB(boolean) {
    if (boolean) {
      dispatch(createdInDB(boolean))
      setSearched(true)
    } else {
      setSearched(false)
    }
  }

  function orderByName(order) {
    if (order) {
      dispatch(setOrderByName(order))
      setSearched(false)
    } else {
      setSearched(false)
    }
  }

  function orderByDOB(order) {
    if (order) {
      dispatch(setOrderByDOB(order))
      setSearched(true)
    } else {
      setSearched(false)
    }
  }

  function handleCreateButton () {
    setShowForm(true)
  }

  function handleCloseForm () {
  setShowForm(false)
  }

  useEffect(() => {
    dispatch(getDrivers())
    dispatch(getTeams())
    dispatch(getNationalities())

    // return (() => {
    // dispatch((cleanFilteredDrivers()))
    // })

  }, [dispatch])
  
  return (  
    <div className={s.mainContent}>
      <NavBar onSearch={onSearch} teams={teams} teamsFilter={filterByTeam} DBFilter={filterByDB} orderByName={orderByName} orderByDOB={orderByDOB} getAllDrivers={submitAllDrivers} handleCreateButton={handleCreateButton} handleCloseForm={handleCloseForm} />
      {showForm
        ? (<CreateForm  handleCloseForm={handleCloseForm} />)
        : showNotFound
          ? (<DriverNotFound handleCreateButton={handleCreateButton}/>)
          : (<CardsContainer drivers={searched ? filteredDrivers : drivers} />)
      }
    </div>)
  
}

export default Home;
