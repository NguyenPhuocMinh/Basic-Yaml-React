import { FETCH_TYPES } from '../constants';

export const fetchStart = () => ({
  type: FETCH_TYPES.FETCH_START
});

export const fetchEnd = () => ({
  type: FETCH_TYPES.FETCH_END
});

export const fetchError = () => ({
  type: FETCH_TYPES.FETCH_ERROR
});

export const fetchCancel = () => ({
  type: FETCH_TYPES.FETCH_CANCEL
});