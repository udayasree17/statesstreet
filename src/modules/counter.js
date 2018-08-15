import transactionData from "../data.json";
export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const TRANSACTION_REQUESTED = 'counter/TRANSACTION_REQUESTED'
export const FILTER_REQUESTED_A = 'counter/FILTER_REQUESTED_ACCOUNT'
export const FILTER_REQUESTED_T = 'counter/FILTER_REQUESTED_TRANSACTION'

const transactionData1 = transactionData.transactions;
const headers = [
  "ACCOUNT NO.",
  "ACCOUNT NAME",
  "CURRENCY",
  "AMOUNT",
  "TRANSACTION TYPE"
];

const filterAccountName = [
  "Savings Account",
  "Checking Account",
  "Auto Loan Account",
  "Credit Card Account",
  "Investment Account",
  "Personal Loan Account",
  "Money Market Account",
  "Home Loan Account"
];

const filterTranactionType = ["Deposit", "Withdrawal", "Invoice", "Payment"];

const initialState = {
  count: 0,
  headers:headers,
  filterAccountList: filterAccountName,
  filterTransactionList : filterTranactionType,
  selectedAccountList: [],
  selectedTransactionList: [],
  selectedData: {},
  ...transactionData
}

const filterList = function  (state) {
  var filteringArray = []; var finalList = [];

  if(state.selectedAccountList.length>0){
      window._.each(state.selectedAccountList,function(eachAccount){
          var pushIntoFilteringArray = window._.where(transactionData1,{ accountName :eachAccount});
          if(pushIntoFilteringArray.length>0){
            filteringArray = [].concat(filteringArray,pushIntoFilteringArray);
          }
      });
  }
  if(filteringArray.length>0){
    window._.each(state.selectedTransactionList,function(eachAccount){
          var pushIntoFilteringArray = window._.where(filteringArray,{ transactionType :eachAccount.toLowerCase()});
          if(pushIntoFilteringArray.length>0){
            finalList = [].concat(finalList, pushIntoFilteringArray);
          }
      });
  } else if(state.selectedTransactionList.length>0){
      window._.each(state.selectedTransactionList,function(eachAccount){
          var pushIntoFilteringArray = window._.where(transactionData1,{ transactionType :eachAccount});
          if(pushIntoFilteringArray.length>0){
            filteringArray = [].concat(filteringArray,pushIntoFilteringArray);
          }
      });
  }
  if(finalList.length > 0){
    return finalList;
  } else if(filteringArray.length > 0){
    return filteringArray;
  }
  return transactionData1;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state
      }
    case TRANSACTION_REQUESTED:
        state.selectedData = action.data;
      return {
        ...state
      }
    case FILTER_REQUESTED_A:
        //state.selectedData = action.data;
        var x = window._.indexOf(state.selectedAccountList,action.data);
        if(x>-1){
          state.selectedAccountList.splice(x, 1);
        } else {
          state.selectedAccountList.push(action.data);
        }
        var filterListX = filterList(state);
      return {
        
        ...state,
        transactions: filterListX
      }
    case FILTER_REQUESTED_T:
      var y = window._.indexOf(state.selectedTransactionList,action.data);
        if(y>-1){
          state.selectedTransactionList.splice(y, 1);
        } else {
          state.selectedTransactionList.push(action.data);
        }
       var filterListY = filterList(state);
      return {
       
        ...state,
        transactions: filterListY
      }

    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

  }
}
export const history = (data) => {
  
  return dispatch => {
    dispatch({
      type: TRANSACTION_REQUESTED,
      data
    })
    
  }
}
export const filteredTranscation = (data) => {
  
  return dispatch => {
    dispatch({
      type: FILTER_REQUESTED_T,
      data
    })

  }
}
export const filteredAccount = (data) => {
  
  return dispatch => {
    dispatch({
      type: FILTER_REQUESTED_A,
      data
    })

  }
}
