import { MOVE_PADDLE } from '../actions/paddle.action';

const initState = {
  padLeft: 100
};

export default function paddleReducer (state = initState, action) {
  switch (action.type) {
    case MOVE_PADDLE:
      return {
        ...state,
        padLeft: action.position
      }
    default:
      return state
  }
};
