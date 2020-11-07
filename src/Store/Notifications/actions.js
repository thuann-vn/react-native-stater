import { createActions } from 'redux-actions';
import types from './types';

export const { addNotification, removeNotification, updateNotification, getNotification, resetNotification} = createActions(
types.ADD,
types.REMOVE,
types.UPDATE,
types.GET,
types.RESET,
);
  