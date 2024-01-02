/* eslint-disable react/prop-types */
import s from './driverNotFound.module.css'

function DriverNotFound({ handleCreateButton }) {
  return (
    <div className={s.container}>
      <img className={ s.driverNotFoundImg } src="/notFoundPilot.png" alt="Sad F1 pilot" />
      <h1 className={s.title}>Piloto no encontrado</h1>
      <button className={ s.createButton } onClick={handleCreateButton}>Crear piloto</button>
    </div>
  );
}

export default DriverNotFound;