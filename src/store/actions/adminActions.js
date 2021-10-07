import { ADMIN_TYPES } from '../constants';

const changeSideBar = (sideBarIsOpen) => dispatch => {
  dispatch({
    type: ADMIN_TYPES.CHANGE_SIDE_BAR,
    payload: sideBarIsOpen
  })
};

const changeSelectedIndex = (index) => dispatch => {
  dispatch({
    type: ADMIN_TYPES.CHANGE_SELECTED_INDEX,
    payload: index
  })
}

const adminActions = {
  changeSideBar,
  changeSelectedIndex
};

export default adminActions;