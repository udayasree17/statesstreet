import React from 'react'
import { Route, Link } from 'react-router-dom'
import TransactionDetail from '../transactionDetail'
import TransactionList from '../transactionList'

const App = () => (
  <div>
    <header>
     
      <Link to="/">TransactionList</Link>
      <Link to="/TransactionDetail">TransactionDetail</Link>
    </header>

    <main>
      <Route exact path="/TransactionDetail" component={TransactionDetail} />
      <Route exact path="/" component={TransactionList} />
    </main>
  </div>
)

export default App
