import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment
} from '../../modules/counter'

const Home = props => (
  <div>
    <h1>Transaction Details</h1>
    <div className='history-details'>
      <div>
        <h1>Transaction {props.selectedData.account}</h1>
        <hr />
      </div>
      <div>
        <p><b>Account No.:</b> {props.selectedData.account}</p>
        <p><b>Account Name:</b> {props.selectedData.accountName}</p>
        <p><b>Currency Code:</b> {props.selectedData.currencyCode}</p>
        <p><b>Amount:</b> {props.selectedData.amount}</p>
        <p className='text-capitalize'><b>Transaction Type:</b> {props.selectedData.transactionType}</p>
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  selectedData: counter.selectedData
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
