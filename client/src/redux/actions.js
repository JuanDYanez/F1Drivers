import axios from 'axios'
import { GET_DRIVERS } from './actions-types'

export function getDrivers() {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/drivers");
    return dispatch({
      type: GET_DRIVERS,
      payload: response.data,
    })
  }
} 