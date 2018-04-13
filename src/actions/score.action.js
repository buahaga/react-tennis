export const EDIT_SCORE = 'EDIT_SCORE';

export function editScore(score) {
  return { type: EDIT_SCORE, value: score };
}
