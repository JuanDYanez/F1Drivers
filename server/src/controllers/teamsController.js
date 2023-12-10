const { Team } = require("../db.js");
const axios = require("axios");

const controllerGetAllTeams = async (req, res) => {
  try {
    const { data } = await axios.get("http://localhost:5000/drivers");

    const allTeams = data.map(driver => driver.teams?.split(/,| y /).map(team => team.trim()) ?? []).flat();
    
    for (let i = 0; i < allTeams.length; i++) {
      await Team.findOrCreate({
        where: { name: allTeams[i] }
      });
    }
    
    // const createAllTeamsInBD = filteredTeams.forEach(
    //   async (team) => await Team.findOrCreate(
    //     {
    //       where:
    //         { name: team }
    //     }
    //   ));
      
    const allTeamsFromBD = await Team.findAll(); 
  
    return allTeamsFromBD;

  } catch (error) {
    return res.status(500).json({error:"Error al cargar los equipos en la Base de Datos"})
  }
}

module.exports = controllerGetAllTeams;
