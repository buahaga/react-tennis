import { EDIT_SCORE_SERVER } from '../actions/score.action';

const initState = {
  yourScore: 0
};

export default function scoreReducer (state = initState, action) {
  switch (action.type) {
    case EDIT_SCORE_SERVER:
      return {
        ...state,
        yourScore: action.value
      }
    default:
      return state
  }
};
