import { CONNECT } from '../actions/connect.action';

const initState = {
  connected: false
};

export default function connectReducer (state = initState, action) {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        connected: action.connected
      }
    default:
      return state
  }
};
