import { MOVE_ENEMY_PADDLE } from '../actions/enemyPaddle.action';

const initState = {
  enemyPadLeft: 100
};

export default function enemyPaddleReducer (state = initState, action) {
  switch (action.type) {
    case MOVE_ENEMY_PADDLE:
      return {
        ...state,
        enemyPadLeft: action.enemyPosition
      }
    default:
      return state
  }
};
