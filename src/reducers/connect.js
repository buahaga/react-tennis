import { CONFIRM_CONNECTION } from '../actions/confirmConnection.action';

const initState = {
  yourID: false
};

export default function connectReducer (state = initState, action) {
  switch (action.type) {
    case CONFIRM_CONNECTION:
      return {
        ...state,
        yourID: action.yourID
      }
    default:
      return state
  }
};
