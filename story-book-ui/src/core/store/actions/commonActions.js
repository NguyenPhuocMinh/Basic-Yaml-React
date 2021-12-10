import EventEmitter from 'eventemitter3';

export const CLEAR_STATE = 'CLEAR_STATE';
export const CHANGE_SIDE_BAR = 'CHANGE_SIDE_BAR';
export const COMPLETE = 'COMPLETE';
export const UNDO = 'UNDO';

export const clearState = () => ({
  type: CLEAR_STATE
});

export const changeSideBar = (isOpen) => ({
  type: CHANGE_SIDE_BAR,
  payload: isOpen
});

export const complete = () => ({
  type: COMPLETE
});

export const undo = () => ({
  type: UNDO
});

export const undoAbleEventEmitter = new EventEmitter();
