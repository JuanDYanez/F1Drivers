import axios from 'axios'
import { FILTER_BY_TEAMS, GET_DRIVERS, CLEAN_FILTERED_DRIVERS, GET_DRIVER_BY_NAME, GET_TEAMS, FILTER_BY_DB, ORDER_BY_NAME, ORDER_BY_DOB, GET_NATIONALITIES, GET_NATIONALITY_FLAG, CLEAR_NATIONALITY_FLAG, NEXT_PAGE, PREV_PAGE, SPECIFIC_PAGE, SET_NOT_FOUND, SET_CURRENT_PAGE} from './actions-types'


export function getDrivers() {

  return async function (dispatch) {
    try {
      const {data} = await axios.get("http://localhost:3001/drivers");
      return dispatch({
        type: GET_DRIVERS,
        payload: data,
      });
    } catch (error) {
      console.error(error)
    }
  }
} 
export function cleanFilteredDrivers() {
  return {
    type: CLEAN_FILTERED_DRIVERS,
    payload: [],
  }
}
export function setCurrentPage() {
  return {
    type: SET_CURRENT_PAGE,
    payload: true,
  };
}
export function cleanShowNotFound() {
  return {
    type: SET_NOT_FOUND,
    payload: false,
  }
}
export function getTeams() {
  return async function (dispatch) {
    try {
      const {data} = await axios.get("http://localhost:3001/teams");
      return dispatch({
        type: GET_TEAMS,
        payload: data,
      });
    } catch (error) {
      console.error(error)
    }
  }
} 
export function getNationalities() {
  return async function (dispatch) {
    try {
      const {data} = await axios.get("http://localhost:3001/drivers/nationalities");
      return dispatch({
        type: GET_NATIONALITIES,
        payload: data,
      });
    } catch (error) {
      console.error(error)
    }
  }
} 

export function getNationalityFlag(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/drivers/flag/${id}`)
    
      return dispatch({
        type: GET_NATIONALITY_FLAG,
        payload: data
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function clearNationalityFlag() {
  return async function (dispatch) {
      return dispatch({
        type: CLEAR_NATIONALITY_FLAG,
        payload: "",
      });
  };
}

export const getDriverByName = (name) => {
  
  return async (dispatch) => {
    try {
      const endpoint = `http://localhost:3001/drivers/name?name=${name}`;
      const response = await axios.get(endpoint)   
        dispatch({
          type: GET_DRIVER_BY_NAME,
          payload: response.data
        });
    } catch (error) {
      console.error(error)
      if (error.response.status === 404) {
        dispatch({
          type: SET_NOT_FOUND,
          payload: true,
        })
      }
    }
  }
}
export const filterByTeams = (team) => {
  return {
      type: FILTER_BY_TEAMS,
      payload: team
    }
}
export const createdInDB = (boolean) => {
  return {
      type: FILTER_BY_DB,
      payload: boolean
    }
}
export const setOrderByName = (order) => {
  return {
      type: ORDER_BY_NAME,
      payload: order
    }
}
export const setOrderByDOB = (order) => {
  return {
    type: ORDER_BY_DOB,
    payload: order
  }
}

export const nextPage = () => {
  return function (dispatch, getStage) {
    const { currentPage } = getStage();
    dispatch({
      type: NEXT_PAGE,
      payload: currentPage + 1
    });
  }
}
export const prevPage = () => {
  return function (dispatch, getStage) {
    const { currentPage } = getStage();
    dispatch({
      type: PREV_PAGE,
      payload: currentPage - 1
    });
  }
}
export const specificPage = (page) => {
  return function (dispatch) {
    dispatch({
      type: SPECIFIC_PAGE,
      payload: page
    });
  }
}