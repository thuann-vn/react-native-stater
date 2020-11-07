import { createActions } from 'redux-actions';
import types from './types';

export const { addContact, addContactWithUid, removeContact, updateContact, getContact, resetContact} = createActions(
types.ADD,
types.ADD_WITH_UID,
types.REMOVE,
types.UPDATE,
types.GET,
types.RESET,
);
  