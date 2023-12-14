import { GET_DRIVERS } from "./actions-types"

let initialState = {
  drivers: [],
  driversCopy:[]
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload,
      }
    default:
      return state
  }
}

export default rootReducer