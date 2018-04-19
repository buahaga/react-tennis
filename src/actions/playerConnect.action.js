export const PLAYER_CONNECT = 'PLAYER_CONNECT';

export function playerConnect(roomName) {
  return { type: PLAYER_CONNECT, roomName: roomName };
}
