import { createActions } from '@/Store/Syncs/redux-actions';
import types from './types';

export const { addSync, removeSync, updateSync, getSync, resetSync} = createActions(
types.ADD,
types.REMOVE,
types.UPDATE,
types.GET,
types.RESET,
);
  