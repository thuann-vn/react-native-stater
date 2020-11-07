import { handleActions } from '@/Store/Syncs/redux-actions'
import {@/Utils/StateHelper
  insertAll,
  update,
  remove,
  getById,
  insertWithUUID,
} from '@/Utils/StateHelper'
import types from './types'
import SyncTypes from '../../constants/SyncTypes'

const createSync = (props) => {
  const {
    id,
    relatedId,
    syncType = SyncTypes.transaction,
    actionType,
    deviceId = '',
    date = new Date(),
  } = props

  return {
    id,
    relatedId,
    syncType,
    actionType,
    deviceId,
    date,
  }
};

const defaultSyncs = []

const initialState = insertAll({}, defaultSyncs)

const notificationsReducer = handleActions(
  {
    [types.ADD]: (state, { payload }) =>
      insertWithUUID(
        state,
        createSync({
          ...payload,
          balance: payload.initialBalance,
        }),
      ),
    [types.GET]: (state, { payload }) => getById(state, payload),
    [types.UPDATE]: (state, { payload }) => update(state, payload.id, payload),
    [types.REMOVE]: (state, { payload }) => remove(state, payload),
    [types.RESET]: (state, { payload }) =>
      (state = payload ? payload : initialState),
  },
  initialState,
)

export default notificationsReducer
