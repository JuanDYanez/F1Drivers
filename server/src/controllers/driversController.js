const { Driver, Team } = require('../db.js')
const { Op, Sequelize } = require("sequelize");
const axios = require('axios')


// Controller para requerir a todos los pilotos (API && BD)
const controllerGetAllDrivers = async () => {
  try {
    const driversFromAPI = (
      await axios.get(`http://localhost:5000/drivers`)
    ).data.map((driver) => {
      const parseImg = () => {
        let driverURL;
        if (driver.image.url === "") {
          driverURL = "../../../nopicdriver.jpg";
        } else if (driver.image.url === "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png") {
          driverURL = "../../../nopicdriver.jpg"
        } else {
          driverURL = driver.image.url
        }
        return driverURL;
      };
      return {
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description,
        image: parseImg(),
        nationality: driver.nationality,
        dob: driver.dob,
        teams: driver.teams,
        createdInDB: false,
      };
    });

    const driversFromDB = await Driver.findAll({
      include: Team,
    });

    const allDrivers = [...driversFromAPI, ...driversFromDB];

    return allDrivers;
  } catch (error) {
    throw new Error("Error al consultar todos los pilotos");
  }
};

// Controller para requerir un piloto por ID (API || BD)
const controllerGetDriverById = async (id) => {
  
  try {
    const allDrivers = await controllerGetAllDrivers();

    const driverFound = await allDrivers.find(driver => driver.id == id)

    return driverFound;
    
  } catch (error) {
    throw new Error("Error al consultar el piloto requerido");
  }
  
};


const controllerGetDriverByName = async (name) => {
  
  try {
    const allDrivers = await controllerGetAllDrivers();
    
    const filteredDrivers = allDrivers.filter(driver => {
      const filterByForename = driver.forename.toLowerCase().includes(name.toLowerCase())
      const filterBySurname = driver.surname.toLowerCase().includes(name.toLowerCase())

      return filterByForename || filterBySurname;
    })

    return filteredDrivers.slice(0,15)
  } catch (error) {
    throw new Error (error)
  }



  //Código para buscar por "name" en la API y en la BD por separado. Pero cuando se hacía la búsqueda por un fragmento del name, no lo encontraba.

  // const capsQuery = (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());

  // const getDriversByForenameFromAPI = await axios
  //   .get(`http://localhost:5000/drivers?name.forename=${encodeURIComponent(capsQuery)}`);
  // const getDriversBySurnameFromAPI = await axios
  //   .get(`http://localhost:5000/drivers?name.surname=${encodeURIComponent(capsQuery)}`);
  
  // const [forenameResponse, surnameResponse] = await Promise.all([getDriversByForenameFromAPI, getDriversBySurnameFromAPI]);

  // const forenameData = Array.isArray(forenameResponse.data) ? forenameResponse.data : [];
  // const surnameData = Array.isArray(surnameResponse.data) ? surnameResponse.data : [];

  // const getDriversFromAPI = [...forenameData, ...surnameData];
  
  // const setDriversFromAPI = getDriversFromAPI.map((driver) => {
  //     return {
  //       id: driver.id,
  //       forename: driver.name.forename,
  //       surname: driver.name.surname,
  //       description: driver.description,
  //       image: driver.image.url,
  //       nationality: driver.nationality,
  //       dob: driver.dob,
  //       teams: driver.teams,
  //     };
  // });
  
  // const getDriversFromDB = await Driver.findAll({
  //   where: {
  //     [Op.or]: [
  //       { forename: { [Op.iLike]: `%${name}%` } },
  //       { surname: { [Op.iLike]: `%${name}%` } },
  //     ],
  //   },
  //   include: Team,
  // });

  // const setDriversFromDB = getDriversFromDB.map((driver) => ({
  //   id: driver.id,
  //   forename: driver.forename,
  //   surname: driver.surname,
  //   description: driver.description,
  //   image: driver.image,
  //   nationality: driver.nationality,
  //   dob: driver.dob,
  //   teams: driver.Teams,
  // }));


  // const combinedDrivers = [...setDriversFromAPI, ...setDriversFromDB].slice(0, 15);

  // return combinedDrivers;
};

// Controller para crear un nuevo piloto (BD)
const controllerCreateNewDriver = async (forename, surname, description, image, nationality, dob, teams) => {
 
  try {
    const newDriver = await Driver.create({
      forename,
      surname,
      description,
      image,
      nationality,
      dob
    });

    const splittedTeams = teams.split(/,/).map(team => team.trim());
    
    for (let i = 0; i < splittedTeams.length; i++) {
      let [foundOrCreatedTeam, created] = await Team.findOrCreate({
      where: { name: splittedTeams[i] }
    });
    
    if (!foundOrCreatedTeam) {
    throw new Error(`Equipo ${splittedTeams[i]} no fue encontrado`)
    }
      
    await newDriver.addTeam(foundOrCreatedTeam)
    }

    return newDriver;
  } catch (error) {
    console.error("Error al crear nuevo piloto en base de datos", error)
    throw error;
  }
  
}

module.exports = {
  controllerCreateNewDriver,
  controllerGetDriverById,
  controllerGetAllDrivers,
  controllerGetDriverByName,
};