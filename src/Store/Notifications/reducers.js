import { handleActions } from 'redux-actions';
import { insertAll, update, remove,  getById, insertWithUUID} from '@/Utils/StateHelper';
import types from './types';
import NotificationTypes from '../../constants/NotificationTypes';

const createNotification = (props) => {
    const {
      id,
      message,
      data = null,
      type = NotificationTypes.remind,
      date = new Date(),
      isRead = false
    } = props;
  
    return {
      id,
      message,
      data,
      type, 
      date,
      isRead
    };
  };

const defaultNotifications = [
];
  
const initialState = insertAll({}, defaultNotifications);

const notificationsReducer = handleActions({
[types.ADD]: (state, { payload }) => insertWithUUID(state, createNotification({
    ...payload,
    balance: payload.initialBalance,
})),
[types.GET]:(state, { payload }) => getById(state, payload),
[types.UPDATE]: (state, { payload }) => update(state, payload.id, payload),
[types.REMOVE]: (state, { payload }) => remove(state, payload),
[types.RESET]: (state, { payload }) => state = payload ? payload : initialState,
}, initialState);

export default notificationsReducer;