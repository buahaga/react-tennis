import { MOVE_PADDLE_SERVER } from '../actions/paddle.action';

const initState = {
  padTop: 390,
  padLeft: 100
};

export default function paddleReducer (state = initState, action) {
  switch (action.type) {
    case MOVE_PADDLE_SERVER:
      return {
        ...state,
        padLeft: action.position
      }
    default:
      return state
  }
};
