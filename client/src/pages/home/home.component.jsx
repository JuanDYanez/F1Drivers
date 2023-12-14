import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "../../redux/actions.js";

import CardsContainer from "../../components/cardsContainer/cardsContainer.component.jsx";
import NavBar from "../../components/navBar/navBar.component.jsx";


import "./home.styles.css";

function Home() {

  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  console.log(drivers)

  const [filteredDrivers, setFilteredDrivers] = useState(drivers);
  const [searchString, setSearchString] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearchString(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const filterDrivers = drivers.filter(driver => driver.forename.includes(searchString))
    
    setFilteredDrivers(filterDrivers)
  }
  useEffect(() => {
    dispatch(getDrivers())
    // return (() => {
    // clearDetail() //Revisar esta parte
    // })
  },[dispatch])
  
  return (  
    <div>
      <p>Esta es la homepage</p>
      <NavBar handleChange={ handleChange } handleSubmit={ handleSubmit } />
      <CardsContainer drivers={filteredDrivers} />
    </div>)
  
}

export default Home;
