import R from 'ramda';
import { handleActions } from 'redux-actions';
import { insert, update, remove, insertWithUUID} from '@/Utils/StateHelper';
import { defaultCategories } from '../../constants/Categories';
import types from './types';

const createOrUpdateCategory = (props) => {
  const {
    id,
    code,
    name,
    icon,
    incomeIcon,
    type,
    parentId = 0,
    isIncome = true,
    usedTimes = 0,
    isHide = false,
    isSynced = false,
    order = 0,
  } = props;

  return {
    id,
    code,
    name,
    icon,
    incomeIcon,
    type,
    isIncome,
    parentId,
    usedTimes,
    isHide,
    isSynced,
    order,
  };
};

let initialState = {};
R.map(item=>{
  initialState = insertWithUUID(initialState,createOrUpdateCategory(item));
}, defaultCategories);

const categoriesReducer = handleActions({
[types.ADD]: (state, { payload }) => insertWithUUID(state, createOrUpdateCategory(payload)),
[types.UPDATE]: (state, {
  payload
}) => update(state, payload.id, createOrUpdateCategory(payload)),
[types.REMOVE]: (state, { payload }) => remove(state, payload),
[types.RESET]: (state, { payload }) => state = (payload ? payload : initialState),
}, initialState);

export default categoriesReducer;