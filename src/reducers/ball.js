import { MOVE_BALL } from '../actions/ball.action';

const initState = {
  ballTop: 0,
  ballLeft: 0,
};

export default function ballReducer(state = initState, action) {
  const { type, position } = action;

  switch (type) {
    case MOVE_BALL:
      return {
        ...state,
        ballTop: position.top,
        ballLeft: position.left,
      };
    default:
      return state;
  }
};
