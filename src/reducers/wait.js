import { WAIT } from '../actions/wait.action';

const initState = {
  display: 'block',
};

export default function connectReducer (state = initState, action) {
  switch (action.type) {
    case WAIT:
      return {
        ...state,
        display: action.display
      }
    default:
      return state
  }
};
