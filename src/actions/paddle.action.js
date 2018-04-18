export const MOVE_PADDLE = 'MOVE_PADDLE';
export const MOVE_PADDLE_SERVER = 'MOVE_PADDLE_SERVER';

export function movePaddle(left) {
  return { type: MOVE_PADDLE, position: left };
}

export function movePaddleServer(left) {
  return { type: MOVE_PADDLE_SERVER, position: left };
}
