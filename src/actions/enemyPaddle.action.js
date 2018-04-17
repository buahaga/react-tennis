export const MOVE_ENEMY_PADDLE = 'MOVE_ENEMY_PADDLE';

export function moveEnemyPaddle(left) {
  return { type: MOVE_ENEMY_PADDLE, enemyPosition: left };
}
