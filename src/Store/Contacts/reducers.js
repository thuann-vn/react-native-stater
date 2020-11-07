import { handleActions } from 'redux-actions';
import { insert, insertAll, update, remove, getById, insertWithUUID, insertAllWithUUID } from '@/Utils/StateHelper';
import types from './types';

const createOrUpdateContact = (props) => {
  const {
    id,
    name,
    avatar = null,
    initialState = 0,
    initialBalance = 0,
    initialDate = new Date(),
    info = null,
    isSynced = false
  } = props;

  return {
    id, name, initialState, initialBalance, initialDate, avatar, info, isSynced
  };
};

const defaultContacts = [
  // createOrUpdateContact({ name: 'Unknown', initialBalance: 0, isSystem: 0 }),
];

const initialState = insertAll({}, defaultContacts);

const contactsReducer = handleActions({
  [types.ADD]: (state, { payload }) => insertWithUUID(state, createOrUpdateContact(payload)),
  [types.ADD_WITH_UID]: (state, { payload }) => insertWithUUID(state, createOrUpdateContact(payload)),
  [types.UPDATE]: (state, { payload }) => update(state, payload.id, createOrUpdateContact(payload)),
  [types.REMOVE]: (state, { payload }) => remove(state, payload),
  [types.RESET]: (state, { payload }) => state = payload ? payload : initialState,
}, initialState);

export default contactsReducer;