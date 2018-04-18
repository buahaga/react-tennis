export const CONNECT = 'CONNECT';

export function confirmConnect() {
  return { type: CONNECT, connected: true };
}
