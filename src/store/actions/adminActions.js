import { ADMIN_TYPES } from '../constants';

const changeSideBar = (sideBarIsOpen) => async dispatch => {
  dispatch({
    type: ADMIN_TYPES.CHANGE_SIDE_BAR,
    payload: sideBarIsOpen
  })
};

const adminActions = {
  changeSideBar
};

export default adminActions;