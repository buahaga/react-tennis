export const MOVE_ENEMY_PADDLE = 'MOVE_ENEMY_PADDLE';
export const MOVE_ENEMY_PADDLE_SERVER = 'MOVE_ENEMY_PADDLE_SERVER';

export function moveEnemyPaddle(left) {
  return { type: MOVE_ENEMY_PADDLE, enemyPosition: left };
}

export function moveEnemyPaddleServer(left) {
  return { type: MOVE_ENEMY_PADDLE_SERVER, enemyPosition: left };
}
