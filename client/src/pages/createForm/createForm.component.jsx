/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import s from "./createForm.styles.css";
import { getNationalities, getTeams } from "../../redux/actions";
import { useEffect } from "react";

function CreateForm() {

  const dispatch = useDispatch()

  const nationalities = useSelector((state) => state.nationalities);

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getNationalities());
  }, [dispatch]);

  // const handleNationalitiesList = (e) => {
  //   nationalitiesList(e.target.value);
  // };

  console.log(nationalities)
  return (
    <div className={s.FormContainer}>
      <form>
        <fieldset>
          <legend>Registra un nuevo piloto</legend>
          <img className={s.logoF1} src="/F1white.svg" alt="F1_Logo" />
          <label htmlFor="">Nombre: </label>
          <input
            type="text"
            name="forename"
            // value={userData.email}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // className={`${errors.email ? s.inputWarning : ""}`}
          />
          {/* {errors.email ? <p className={s.textWarning}>{errors.email}</p> : ""} */}

          <label htmlFor="">Apellido: </label>
          <input
            type="text"
            name="surname"
            // value={userData.password}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // className={`${errors.password ? s.inputWarning : ""}`}
          />
          {/* {errors.password ? (
            <p className={s.textWarning}>{errors.password}</p>
          ) : (
            ""
          )} */}

          <label htmlFor="">Nacionalidad: </label>
          <select defaultValue="">
            <option disabled value="" >Selecciona una nacionalidad</option>
            {nationalities?.map((nationality, index) => (
              <option key={index} value={nationality}>{nationality}</option>
            ))}
            {/* // value={userData.password}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // className={`${errors.password ? s.inputWarning : ""}`} */}
          </select>
          {/* {errors.password ? (
            <p className={s.textWarning}>{errors.password}</p>
          ) : (
            ""
          )} */}

          <label htmlFor="">Imagen: </label>
          <input
            type="text"
            name="surname"
            // value={userData.password}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // className={`${errors.password ? s.inputWarning : ""}`}
          />
          {/* {errors.password ? (
            <p className={s.textWarning}>{errors.password}</p>
          ) : (
            ""
          )} */}

          <label htmlFor="">Fecha de nacimiento: </label>
          <input
            type="text"
            name="surname"
            // value={userData.password}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // className={`${errors.password ? s.inputWarning : ""}`}
          />
          {/* {errors.password ? (
            <p className={s.textWarning}>{errors.password}</p>
          ) : (
            ""
          )} */}

          <label htmlFor="">Descripción: </label>
          <input
            type="text"
            name="surname"
            // value={userData.password}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // className={`${errors.password ? s.inputWarning : ""}`}
          />
          {/* {errors.password ? (
            <p className={s.textWarning}>{errors.password}</p>
          ) : (
            ""
          )} */}

          <label htmlFor="">Escuderías: </label>
          <input
            type="text"
            name="surname"
            // value={userData.password}
            // onChange={handleChange}
            // onBlur={handleBlur}
            // className={`${errors.password ? s.inputWarning : ""}`}
          />
     

          <div>
            <button
              className={s.submitButton}
              // onClick={handleSubmit}
            >
              Ingresa
            </button>
            {/* <button className={s.submitButton} onClick={handleRegister}>
              <NavLink to="/register">
                  Regístrate
              </NavLink>
            </button> */}
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateForm;
