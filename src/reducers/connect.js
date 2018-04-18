import { CONFIRM_CONNECTION } from '../actions/confirmConnection.action';

const initState = {
  playerID: false
};

export default function connectReducer (state = initState, action) {
  switch (action.type) {
    case CONFIRM_CONNECTION:
      return {
        ...state,
        playerID: action.playerID
      }
    default:
      return state
  }
};
