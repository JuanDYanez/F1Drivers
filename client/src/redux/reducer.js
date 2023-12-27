import { GET_DRIVERS, GET_DRIVER_BY_NAME, GET_TEAMS, FILTER_BY_TEAMS, FILTER_BY_DB, ORDER_BY_NAME, ORDER_BY_DOB, GET_NATIONALITIES, GET_NATIONALITY_FLAG, CLEAR_NATIONALITY_FLAG } from "./actions-types"

let initialState = {
  drivers: [],
  filteredDrivers: [],
  teams: [],
  nationalities: [],
  driverData: [],
  nationalityFlag: ""
  // driversCopy:[]
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
      };
    case GET_DRIVER_BY_NAME:
      return {
        ...state,
        filteredDrivers: action.payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case GET_NATIONALITIES:
      return {
        ...state,
        nationalities: action.payload,
      };
    case GET_NATIONALITY_FLAG:
      return {
        ...state,
        nationalityFlag: action.payload,
      };
    case CLEAR_NATIONALITY_FLAG:
      return {
        ...state,
        nationalityFlag: action.payload,
      };
    case FILTER_BY_TEAMS:
      // eslint-disable-next-line no-case-declarations
      let teamsFilter = state.drivers.filter((driver) => {
        if (!driver.createdInDB) {
          return driver.teams && driver.teams.includes(action.payload);
        }
        if (driver.createdInDB) {
          return (
            driver.Teams &&
            driver.Teams.some((team) => team.name === action.payload)
          );
        }
        return false;
      });
      return {
        ...state,
        filteredDrivers: teamsFilter,
      };
    case FILTER_BY_DB:
      // eslint-disable-next-line no-case-declarations
      let DBFilter;
      if (action.payload === "Y") {
        DBFilter = state.drivers.filter((driver) => {
          return driver.createdInDB === true;
        });
      } else if (action.payload === "N") {
        DBFilter = state.drivers.filter((driver) => {
          return driver.createdInDB === false;
        });
      } else {
        return {
          ...state,
          filteredDrivers: state.drivers,
        };
      }
      return {
        ...state,
        filteredDrivers: DBFilter,
      };
    case ORDER_BY_NAME:
      // eslint-disable-next-line no-case-declarations
      let orderedByName;
      if (action.payload === "A") {
        orderedByName = [...state.drivers].sort((a, b) => {
          return a.forename.localeCompare(b.forename, "en", {
            sensitivity: "base",
          });
        });
      }
      if (action.payload === "D") {
        orderedByName = [...state.drivers].sort((a, b) => {
          return b.forename.localeCompare(a.forename, "en", {
            sensitivity: "base",
          });
        });
      }
      return {
        ...state,
        filteredDrivers: orderedByName,
      };
    case ORDER_BY_DOB:
      // eslint-disable-next-line no-case-declarations
      let orderedByDOB;
      if (action.payload === "A") {
        orderedByDOB = [...state.drivers].sort((a, b) => {
          return a.dob.localeCompare(b.dob, "en", { sensitivity: "base" });
        });
      }
      if (action.payload === "D") {
        orderedByDOB = [...state.drivers].sort((a, b) => {
          return b.dob.localeCompare(a.dob, "en", { sensitivity: "base" });
        });
      }
      return {
        ...state,
        filteredDrivers: orderedByDOB,
      };
    default:
      return state;
  }
}

export default rootReducer