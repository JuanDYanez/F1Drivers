const validate = (input) => {
  let errors = {}
  
  !input.forename
    ? errors = { ...errors, forename: "Debes ingresar un nombre" }
    : errors = { ...errors, forename: "" }
  
  !input.surname
    ? errors = { ...errors, surname: "Debes ingresar un apellido" }
    : errors = { ...errors, surname: "" }
  
  !input.nationality
    ? errors = { ...errors, nationality: "Debes seleccionar una nacionalidad" }
    : errors = { ...errors, nationality: "" }
  
  !input.dob
    ? errors = { ...errors, dob: "Debes ingresar la fecha de nacimiento" }
    : errors = { ...errors, dob: "" }
  
  !input.teams
    ? errors = { ...errors, teams: "Debes seleccionar los equipos" }
    : errors = { ...errors, teams: "" }
  

  return errors
}

export default validate;