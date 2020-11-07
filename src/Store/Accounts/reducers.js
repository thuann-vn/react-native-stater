import { handleActions } from 'redux-actions'
import {
  insertAll,
  update,
  remove,
  getById,
  insertWithUUID,
} from '@/Utils/StateHelper'
import types from './types'
import AccountTypes, {
  SavingPeriod,
  SavingInterestPaid,
  SavingEndAction,
} from '../../constants/AccountTypes'
import Currency from '../../constants/Currency'

const createOrUpdateAccount = (props) => {
  const {
    id,
    name,
    initialBalance = 0,
    initialDate = new Date(),
    balance = 0,
    color = 'blue',
    excludedFromTotal = false,
    icon = 'wallet',
    currency = Currency.USD.code,
    type = AccountTypes.Default,
    isSynced = false,
    order = 0,

    //For saving
    startDate = new Date(),
    endDate = new Date(),
    savingPeriod = SavingPeriod.saving_12months,
    savingToAccount = null,
    interestRate = 6.5,
    variableInterestRate = 0.5,
    savingInterestPaid = SavingInterestPaid.saving_interest_paid_maturity,
    savingEndAction = SavingEndAction.saving_rollover_w_interest,
    savingFromAccount = null,

    //For credit
    creditLimit = 0,
    creditDueDay = 10,
    creditReminderEnabled = true,
    creditReminderBefore = 2,

    //HIde from report
    hideFromReport = false,
  } = props

  return {
    id,
    name,
    initialBalance,
    initialDate,
    color,
    balance,
    excludedFromTotal,
    icon,
    type,
    currency,
    order,
    isSynced,
    startDate,
    endDate,
    savingPeriod,
    savingEndAction,
    savingToAccount,
    savingFromAccount,
    savingInterestPaid,
    interestRate,
    variableInterestRate,
    creditLimit,
    creditDueDay,
    creditReminderEnabled,
    creditReminderBefore,
    hideFromReport,
  }
}

const defaultAccounts = [
  // createAccount({ name: 'Cash', color: iOSColors.yellow, excludedFromTotal: false, icon: '015cash', type: AccountTypes.Default, initialBalance: 1000}),
  // createAccount({ name: 'Credit Card', color: iOSColors.orange, excludedFromTotal: false, icon: '005visa', type: AccountTypes.Credit, initialBalance: 2000 }),
  // createAccount({ name: 'Save Account', color: iOSColors.green, excludedFromTotal: true, icon: '011save', type: AccountTypes.Saving, initialBalance: 5000 }),
]

const initialState = insertAll({}, defaultAccounts)

const accountsReducer = handleActions(
  {
    [types.ADD]: (state, { payload }) =>
      insertWithUUID(
        state,
        createOrUpdateAccount({
          ...payload,
          balance: payload.initialBalance,
        }),
      ),
    [types.GET]: (state, { payload }) => getById(state, payload),
    [types.UPDATE]: (state, { payload }) =>
      update(state, payload.id, createOrUpdateAccount(payload)),
    [types.REMOVE]: (state, { payload }) => remove(state, payload),
    [types.RESET]: (state, { payload }) =>
      (state = payload ? payload : initialState),
  },
  initialState,
)

export default accountsReducer
