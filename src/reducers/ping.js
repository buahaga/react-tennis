import { PLAYER_CONNECT } from '../actions/playerConnect.action';
//const randomstring = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
const initState = {
  roomName: "randomstring",
};

export default function pingReducer (state = initState, action) {
  switch (action.type) {
    case PLAYER_CONNECT:
      return {
        ...state,
        roomName: action.roomName
      }
    default:
      return state
  }
};
