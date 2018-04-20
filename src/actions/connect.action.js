export const CONNECTING = 'CONNECTING';
export const CONNECTED = 'CONNECTED';
export const SET_PATH = 'SET_PATH';

export function connecting(roomName, playerName) {
  return { type: CONNECTING, roomName: roomName, playerName: playerName };
}

export function connected(data, name) {
  return { type: CONNECTED, playerID: data };
}

export function setPath(path) {
  return { type: SET_PATH, path: path };
}
