const { Driver, Team } = require('../db.js')
const { Op } = require("sequelize");
const axios = require('axios')


// Controller para requerir a todos los pilotos (API && BD)
const controllerGetAllDrivers = async () => {
  try {
    const driversFromAPI = (
      await axios.get(`http://localhost:5000/drivers`)
    ).data.map((driver) => {
      return {
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description,
        image: driver.image.url || '../../../F1.svg',
        nationality: driver.nationality,
        dob: driver.dob,
        teams: driver.teams,
      };
    });

    const driversFromDB = await Driver.findAll();

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
  
  const capsQuery = (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());

  const getDriversByForenameFromAPI = await axios
    .get(`http://localhost:5000/drivers?name.forename=${capsQuery}`);
  const getDriversBySurnameFromAPI = await axios
    .get(`http://localhost:5000/drivers?name.surname=${capsQuery}`);
  
  const [forenameResponse, surnameResponse] = await Promise.all([getDriversByForenameFromAPI, getDriversBySurnameFromAPI]);

  const forenameData = Array.isArray(forenameResponse.data) ? forenameResponse.data : [];
  const surnameData = Array.isArray(surnameResponse.data) ? surnameResponse.data : [];

  const getDriversFromAPI = [...forenameData, ...surnameData];
  
  const setDriversFromAPI = getDriversFromAPI.map((driver) => {
      return {
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description,
        image: driver.image.url,
        nationality: driver.nationality,
        dob: driver.dob,
        teams: driver.teams,
      };
  });
  
  const getDriversFromDB = await Driver.findAll({
    where: {
      [Op.or]: [
        { forename: { [Op.iLike]: `%${name}%` } },
        { surname: { [Op.iLike]: `%${name}%` } },
      ],
    },
    include: Team,
  });

  const setDriversFromDB = getDriversFromDB.map((driver) => ({
    id: driver.id,
    forename: driver.forename,
    surname: driver.surname,
    description: driver.description,
    image: driver.image,
    nationality: driver.nationality,
    dob: driver.dob,
    teams: driver.teams,
  }));


  const combinedDrivers = [...setDriversFromAPI, ...setDriversFromDB].slice(0, 15);

  return combinedDrivers;
};

// Controller para crear un nuevo piloto (BD)
const controllerCreateNewDriver = async (forename, surname, description, image, nationality, dob, teams) => {
  
  try {
    return await Driver.create({ forename, surname, description, image, nationality, dob, teams })
  } catch (error) {
    throw new Error("Error al crear nuevo piloto en base de datos")
  }
  
}

module.exports = {
  controllerCreateNewDriver,
  controllerGetDriverById,
  controllerGetAllDrivers,
  controllerGetDriverByName,
};