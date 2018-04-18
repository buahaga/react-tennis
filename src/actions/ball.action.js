export const MOVE_BALL = 'MOVE_BALL';
export const MOVE_BALL_SERVER = 'MOVE_BALL_SERVER';

export function moveBall(top, left) {
  return { type: MOVE_BALL, position: { top, left } };
}

export function moveBallServer(top, left) {
  return { type: MOVE_BALL_SERVER, position: { top, left } };
}
