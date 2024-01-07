/* eslint-disable no-case-declarations */
import { GET_DRIVERS, GET_DRIVER_BY_NAME, GET_TEAMS, FILTER_BY_TEAMS, FILTER_BY_NATIONALITY, FILTER_BY_DB, ORDER_BY_NAME, ORDER_BY_DOB, CLEAN_FILTERED_DRIVERS, SET_NOT_FOUND, SET_SEARCHED } from "./actions-types"

let initialState = {
  drivers: [],
  copyDrivers: [],
  filteredDrivers: [],
  teams: [],
  showNotFound: false,
  searched: false,
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
        copyDrivers: action.payload,
      };
    case CLEAN_FILTERED_DRIVERS:
      return {
        ...state,
        filteredDrivers: action.payload,
      };
    case GET_DRIVER_BY_NAME:
      return {
        ...state,
        filteredDrivers: action.payload,
        copyDrivers: action.payload,
        showNotFound: false,
      };
    case SET_NOT_FOUND:
      return {
        ...state,
        showNotFound: action.payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case FILTER_BY_TEAMS:
      // eslint-disable-next-line no-case-declarations
      let teamsFilter;
      
      if (state.filteredDrivers.length === 0) {
        teamsFilter = state.drivers.filter((driver) => {
          if (!driver.createdInDB) {
            return driver.teams && driver.teams.includes(action.payload);
          }
          if (driver.createdInDB) {
            return (
              driver.Teams &&
              driver.Teams.some((team) => team.name === action.payload)
            );
          }
        });
      }

      if (state.filteredDrivers.length >= 1) {
        teamsFilter = state.filteredDrivers.filter((driver) => {
          if (!driver.createdInDB) {
            return driver.teams && driver.teams.includes(action.payload);
          }
          if (driver.createdInDB) {
            return (
              driver.Teams &&
              driver.Teams.some((team) => team.name === action.payload)
            );
          }
        });
      }

    return {
      ...state,
      filteredDrivers: teamsFilter,
      copyDrivers: teamsFilter,
    };
    
    case FILTER_BY_NATIONALITY:
      // eslint-disable-next-line no-case-declarations

      let nationalityFilter;

      if (state.filteredDrivers.length === 0) {
        nationalityFilter = state.drivers.filter(
          (driver) => driver.nationality === action.payload
        );
      }

      if (state.filteredDrivers.length >= 1) {
        nationalityFilter = state.filteredDrivers.filter(
          (driver) => driver.nationality === action.payload
        );
      }

      return {
        ...state,
        filteredDrivers: nationalityFilter,
        copyDrivers: nationalityFilter,
      };

    case FILTER_BY_DB:
      // eslint-disable-next-line no-case-declarations
      let DBDrivers;

      if (state.filteredDrivers.length === 0) {
        if (action.payload === "Y") {
          DBDrivers = state.drivers.filter((driver) => {
            return driver.createdInDB === true;
          });
        }
        if (action.payload === "N") {
          DBDrivers = state.drivers.filter((driver) => {
            return driver.createdInDB === false;
          });
        }
      }

      if (state.filteredDrivers.length >= 1) {
        if (action.payload === "Y") {
          DBDrivers = state.filteredDrivers.filter((driver) => {
            return driver.createdInDB === true;
          });
        }
        if (action.payload === "N") {
          DBDrivers = state.filteredDrivers.filter((driver) => {
            return driver.createdInDB === false;
          });
        }
      }

      return {
        ...state,
        filteredDrivers: DBDrivers,
        copyDrivers: DBDrivers,
      };

    case ORDER_BY_NAME:
      // eslint-disable-next-line no-case-declarations
      let orderedByName;
      // const copyDrivers = state.drivers.slice()
      if (state.filteredDrivers.length >= 1) {
        if (action.payload === "A") {
          orderedByName = [...state.filteredDrivers].sort((a, b) => {
            return a.forename.localeCompare(b.forename, "en", {
              sensitivity: "base",
            });
          });
        }
        if (action.payload === "D") {
          orderedByName = [...state.filteredDrivers].sort((a, b) => {
            return b.forename.localeCompare(a.forename, "en", {
              sensitivity: "base",
            });
          });
        }
      }
      if (state.filteredDrivers.length === 0) {
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
      }
      return {
        ...state,
        drivers: orderedByName,
      };

    case ORDER_BY_DOB:
      // eslint-disable-next-line no-case-declarations
      let orderedByDOB;

      if (state.filteredDrivers.length >= 1) {
        if (action.payload === "A") {
          orderedByDOB = [...state.filteredDrivers].sort((a, b) => {
            return a.dob.localeCompare(b.dob, "en", { sensitivity: "base" });
          });
        }
        if (action.payload === "D") {
          orderedByDOB = [...state.filteredDrivers].sort((a, b) => {
            return b.dob.localeCompare(a.dob, "en", { sensitivity: "base" });
          });
        }
      }
      if (state.filteredDrivers.length === 0) {
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
      }
      return {
        ...state,
        filteredDrivers: orderedByDOB,
      };
    case SET_SEARCHED:
      return {
        ...state,
        searched: action.payload,
      };
    default:
      return state;
  }


}



export default rootReducer