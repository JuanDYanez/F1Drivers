/* eslint-disable react/prop-types */
import "./navBar.module.css";
function NavBar({handleChange, handleSubmit}) {
  return (
    <div>
      <form onChange={handleChange}>
        <input placeholder="Ingresa un nombre" type="search" />
        <button type="submit" onClick={handleSubmit}>Buscar</button>
      </form>
    </div>
  );
}

export default NavBar;
