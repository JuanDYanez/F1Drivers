/* eslint-disable no-case-declarations */
import { GET_DRIVERS, GET_DRIVER_BY_NAME, GET_TEAMS, FILTER_BY_TEAMS, FILTER_BY_DB, ORDER_BY_NAME, ORDER_BY_DOB, GET_NATIONALITIES, GET_NATIONALITY_FLAG, CLEAR_NATIONALITY_FLAG, NEXT_PAGE, PREV_PAGE, SPECIFIC_PAGE, CLEAN_FILTERED_DRIVERS, SET_NOT_FOUND, SET_CURRENT_PAGE } from "./actions-types"

let initialState = {
  drivers: [],
  filteredDrivers: [],
  copyDrivers: [],
  teams: [],
  nationalities: [],
  driverData: [],
  nationalityFlag: "",
  currentPage: 1,
  showNotFound: false,
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
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
        currentPage: 1,
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
        currentPage: 1,
      };

    case FILTER_BY_DB:
      // eslint-disable-next-line no-case-declarations
      let DBDrivers;

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

      return {
        ...state,
        filteredDrivers: DBDrivers,
        currentPage: 1,
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
        currentPage: 1,
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
        currentPage: 1,
      };

    case NEXT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case PREV_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SPECIFIC_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }


}



export default rootReducer