import { CONNECTED } from '../actions/connect.action';
import { CONNECTING } from '../actions/connect.action';
import { SET_PATH } from '../actions/connect.action';

const initState = {
  playerID: 0,
  roomName: '',
  playerName: '',
};

export default function connectReducer (state = initState, action) {
  switch (action.type) {
    case CONNECTED:
      return {
        ...state,
        playerID: action.playerID
      }
      case CONNECTING:
        return {
          ...state,
          roomName: action.roomName,
          playerName: action.playerName
        }
        case SET_PATH:
          return {
            ...state,
            roomName: action.path,
          }
    default:
      return state
  }
};
