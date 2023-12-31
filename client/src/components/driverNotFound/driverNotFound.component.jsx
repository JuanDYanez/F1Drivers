/* eslint-disable react/prop-types */


function DriverNotFound({ handleCreateButton }) {
  return (
    <div>
      <h1>Piloto No Encontrado</h1>
      <button onClick={handleCreateButton}>Crear piloto</button>
    </div>
  );
}

export default DriverNotFound;