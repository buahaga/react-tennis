export const MOVE_BALL = 'MOVE_BALL';

export function moveBall(top, left) {
  return { type: MOVE_BALL, position: { top, left } };
}
