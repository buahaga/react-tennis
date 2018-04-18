export const WAIT = 'WAIT';

export function waitTillConnection(display) {
  return { type: WAIT, display: display };
}
