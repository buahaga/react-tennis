import { MOVE_ENEMY_PADDLE_SERVER } from '../actions/enemy.action';

const initState = {
  enemyPadTop: 0,
  enemyPadLeft: 100
};

export default function enemyPaddleReducer (state = initState, action) {
  switch (action.type) {
    case MOVE_ENEMY_PADDLE_SERVER:
      return {
        ...state,
        enemyPadLeft: action.enemyPosition
      }
    default:
      return state
  }
};
