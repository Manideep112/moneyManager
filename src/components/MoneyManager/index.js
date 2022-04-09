import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    title: '',
    income: null,
    selection: 'INCOME',
    transactionsList: [],
    totalBalance: 0,
    balanceIncome: 0,
    balanceExpenses: 0,
  }

  titleUser = event => {
    const userinput = event.target.value
    this.setState({title: userinput})
  }

  amountUser = event => {
    const userincome = event.target.value
    this.setState({income: userincome})
  }

  userOption = event => {
    const userSelect = event.target.value
    this.setState({selection: userSelect})
    console.log(userSelect)
  }

  deleteTransaction = (id, income, selection) => {
    const {transactionsList} = this.state
    let {totalBalance, balanceIncome, balanceExpenses} = this.state

    const filteredList = transactionsList.filter(
      eachtransaction => eachtransaction.id !== id,
    )
    if (selection === 'Income') {
      totalBalance -= parseInt(income)
      balanceIncome -= income
    } else {
      totalBalance += parseInt(income)
      balanceExpenses -= income
    }
    this.setState({
      transactionsList: filteredList,
      totalBalance,
      balanceIncome,
      balanceExpenses,
    })
  }

  addTransaction = () => {
    const {
      title,
      income,
      selection,
      transactionsList,
      totalBalance,
      balanceExpenses,
      balanceIncome,
    } = this.state

    let total
    let incomeExpenses = balanceIncome
    let expenses = balanceExpenses
    if (selection === 'INCOME') {
      incomeExpenses = parseInt(balanceIncome) + parseInt(income)
      total = parseInt(totalBalance) + parseInt(income)
    } else {
      expenses = parseInt(balanceExpenses) + parseInt(income)
      total = totalBalance - income
    }

    const displayText = selection === 'INCOME' ? 'Income' : 'Expenses'

    const transaction = {
      id: uuidv4(),
      title,
      income,
      selection: displayText,
    }

    this.setState({
      transactionsList: [...transactionsList, transaction],
      totalBalance: total,
      balanceIncome: incomeExpenses,
      balanceExpenses: expenses,
      income: '',
      title: '',
    })
  }

  render() {
    const {
      transactionsList,
      totalBalance,
      balanceIncome,
      balanceExpenses,
      income,
      title,
    } = this.state
    console.log(transactionsList)

    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="name-container">
            <h1 className="heading">Hi,Richard</h1>
            <p className="paragraph2">
              Welcome back to your
              <span className="span-element"> Money Manager</span>
            </p>
          </div>
          <ul className="unordered-list">
            <MoneyDetails
              image="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              text="Your Balance"
              bgColor="bgGreen"
              altvalue="balance"
              totalMoney={totalBalance}
              test="balanceAmount"
            />

            <MoneyDetails
              image="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              text="Your Income"
              bgColor="bgBlue"
              altvalue="income"
              totalMoney={balanceIncome}
              test="incomeAmount"
            />

            <MoneyDetails
              image="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              text="Your Expenses"
              bgColor="bgViolet"
              altvalue="expenses"
              totalMoney={balanceExpenses}
              test="expensesAmount"
            />
          </ul>
          <div className="transactions-container">
            <div className="transactions-details">
              <div className="transaction-add-container">
                <h1 className="transaction-heading ">Add Transaction</h1>
                <label htmlFor="title" className="label-heading">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="TITLE"
                  className="input-element"
                  onChange={this.titleUser}
                  value={title}
                />
                <label htmlFor="amount" className="label-heading">
                  Amount
                </label>
                <input
                  type="text"
                  placeholder="AMOUNT"
                  id="amount"
                  className="input-element"
                  onChange={this.amountUser}
                  value={income}
                />
                <label htmlFor="options" className="label-heading">
                  Type
                </label>
                <select
                  id="options"
                  className="input-element"
                  onChange={this.userOption}
                >
                  {transactionTypeOptions.map(eachoption => (
                    <option
                      value={eachoption.optionId}
                      key={eachoption.optionId}
                    >
                      {eachoption.displayText}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="button-style"
                  onClick={this.addTransaction}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="transactions-details1">
              <div>
                <h1 className="transaction-heading">History</h1>
                <div className="transactions">
                  <p className="transaction-titles">Title</p>
                  <p className="transaction-titles">Amount</p>
                  <p className="transaction-titles">Type</p>
                </div>
                <ul className="transactions-list-container1">
                  {transactionsList.map(eachtransaction => (
                    <TransactionItem
                      transactionDetails={eachtransaction}
                      deleting={this.deleteTransaction}
                      key={eachtransaction.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
