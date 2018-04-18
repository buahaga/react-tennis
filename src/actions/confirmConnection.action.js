export const CONFIRM_CONNECTION = 'CONFIRM_CONNECTION';

export function confirmConnect(data) {
  return { type: CONFIRM_CONNECTION, yourID: data };
}
