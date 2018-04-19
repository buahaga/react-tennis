export const CONFIRM_CONNECTION = 'CONFIRM_CONNECTION';

export function confirmConnect(data, name) {
  return { type: CONFIRM_CONNECTION, playerID: data, roomName: name };
}
