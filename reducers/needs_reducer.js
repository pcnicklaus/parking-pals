import { CREATE_BLANK_MARKER, FETCH_NEEDS } from '../actions/types';

export default function(state=[], action) {
  switch(action.type) {
    case CREATE_BLANK_MARKER:
      return [ action.payload ]
    case FETCH_NEEDS:
      return action.payload;
    default:
      return state;
  }
}
