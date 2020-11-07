import { handleActions } from "redux-actions";
import {
  insert,
  insertAll,
  update,
  remove,
  insertWithUUID
} from "@/Utils/StateHelper";
import types from "./types";
import PlanTypes from "../../constants/PlanTypes";

const createOrUpdatePlan = props => {
  const {
    value,
    account,
    category,
    currency,
    fromDate = new Date(),
    toDate = new Date(),
    dateRangeType = null,
    note,
    image,

    //Extra information
    reminder,
    repeat = null,
    repeatEndDate = null,
    repeatTimes = 0, //Runned times

    //Plan type
    type = PlanTypes.Budget,
    isSynced = false,
  } = props;

  return {
    value,
    account,
    category,
    currency,
    fromDate,
    toDate,
    dateRangeType,
    note,
    image,
    reminder,
    repeat,
    repeatEndDate,
    repeatTimes,
    type,
    isSynced
  };
};

const initialState = insertAll({}, []);

const plansReducer = handleActions(
  {
    [types.ADD]: (state, { payload }) => insertWithUUID(state, createOrUpdatePlan(payload)),
    [types.UPDATE]: (state, {
      payload
    }) => update(state, payload.id, createOrUpdatePlan(payload)),
    [types.REMOVE]: (state, { payload }) => remove(state, payload),
    [types.RESET]: (state, { payload }) => state = payload ? payload : initialState,
  },
  initialState
);

export default plansReducer;
