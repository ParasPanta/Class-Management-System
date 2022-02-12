import {
  CLOSE_ANNOUNCEMENTS_BYID,
  CREATE_ADMIN_ANNOUNCEMENT,
  DELETE_ADMIN_ANNOUNCEMENTS,
  GET_ADMIN_ANNOUNCEMENTS_BYID,
} from "../../actiontypes/admin/announcementtypes";

const initialState = {
  isOpen: false,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ADMIN_ANNOUNCEMENT:
    case DELETE_ADMIN_ANNOUNCEMENTS:
      return { ...state };

    case GET_ADMIN_ANNOUNCEMENTS_BYID:
      return { ...state, adminnoticesId: action.payload, isOpen: true };

    case CLOSE_ANNOUNCEMENTS_BYID:
      return { ...state, isOpen: false };

    default:
      return state;
  }
}
