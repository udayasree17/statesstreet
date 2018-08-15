import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  history,
  filteredAccount,
  filteredTranscation
} from '../../modules/counter'


const Home = props => (
	<div>
    <h1>My Transactions</h1>
    <div className="clear-both">
    <div className="left-block">
    	<h3>Account List</h3>
    	<ul >

          {props.filterAccountList &&
            props.filterAccountList.map((list, index) => {
              return (
                <li key={index}>
                  <input
                    type="checkbox"
                    onChange={event => {
                       props.filteredAccount(list,"account");
                       console.log(event);
                    }}
                  />
                  {list}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="left-block">
        <h3>Transaction List</h3>
        <ul >
          {props.filterTransactionList &&
            props.filterTransactionList.map((list, index) => {
              return (
                <li key={index}>
                  <input
                    type="checkbox"
                    onChange={event => {
                       props.filteredTranscation(list,"transaction");
                       console.log(event);
                    }}
                  />
                  {list}
                </li>
              );
            })}
        </ul>
    </div>
    </div>
	{
		props.headers && props.transactionData &&
	     <div className="clear-both">
	         <h3>Total List : {props.transactionData.length}</h3>
	        <table>
	          <thead>
	            <tr>
	              {props.headers.map((heading, index) => (
	                <th key={index}>{heading}</th>
	              ))}
	            </tr>
	          </thead>
	          <tbody>
	            {props.transactionData &&
	              props.transactionData.map((data, index) => {
	                return (
	                  <tr key={index} className="transaction-table-row">
	                    <td
	                      className="account-link"
	                      onClick={() => {
							   props.navigateToHistory(data);
							   props.changePage()
							}}
	                    >
	                      {data.account}
	                    </td>
	                    <td>{data.accountName}</td>
	                    <td>{data.currencyCode}</td>
	                    <td>{data.amount}</td>
	                    <td className="text-capitalize">{data.transactionType}</td>
	                  </tr>
	                );
	              })}
	          </tbody>
	        </table>
	      </div>
	  }

    <p>
      <button onClick={() => props.changePage()}>
        Go to about page via redux
      </button>
    </p>
  </div>
)

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  headers:counter.headers,
  transactionData: counter.transactions,
  filterAccountList: counter.filterAccountList,
  filterTransactionList: counter.filterTransactionList
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      changePage: () => push('/TransactionDetail'),
      navigateToHistory: history,
      filteredAccount:filteredAccount,
      filteredTranscation: filteredTranscation

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
