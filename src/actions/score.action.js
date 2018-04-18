export const EDIT_SCORE = 'EDIT_SCORE';
export const EDIT_SCORE_SERVER = 'EDIT_SCORE_SERVER';

export function editScore(score) {
  return { type: EDIT_SCORE, value: score };
}

export function editScoreServer(score) {
  return { type: EDIT_SCORE_SERVER, value: score };
}
