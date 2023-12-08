const { controllerCreateNewDriver, controllerGetDriverById, controllerGetAllDrivers, controllerGetDriverByName } = require("../controllers/driversController");


// Handler para requerir los pilotos por nombre (API && BD)
const handlerGetDriverByName = async (req, res) => {
  const { name } = req.query;
  
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({message:"Debes introducir un nombre válido"})
  }

  try {

    const driversFound = await controllerGetDriverByName(name);

    if (driversFound.length === 0) {
      return res.status(404).json({message: "No existen pilotos con ese nombre"});
    }

    res.status(200).json(driversFound)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

};


// Handler para requerir un piloto por ID (API || BD)
const handlerGetDriverById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await controllerGetDriverById(id); 
    
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
};


// Handler para requerir a todos los pilotos (API && BD)
const handlerGetAllDrivers = async (req, res) => {

  try {
    const response = await controllerGetAllDrivers();
    
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};


// Handler para crear un nuevo piloto (BD)
const handlerCreateNewDriver = async (req, res) => {
  const { forename, surname, description, image, nationality, dob, teams } = req.body;

  try {
    const response = await controllerCreateNewDriver(
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      teams,
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerGetAllDrivers,
  handlerGetDriverByName,
  handlerGetDriverById,
  handlerCreateNewDriver,
};