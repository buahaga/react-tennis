export const MOVE_PADDLE = 'MOVE_PADDLE';

export function movePaddle(left) {
  return { type: MOVE_PADDLE, position: left };
}
