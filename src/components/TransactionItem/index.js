// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleting} = props
  const {id, title, income, selection} = transactionDetails

  const deleted = () => {
    deleting(id, income, selection)
  }

  return (
    <li className="list-container">
      <p className="paragraph">{title}</p>
      <p className="paragraph">Rs {income}</p>
      <div className="paragraph container">
        <p>{selection}</p>
        <button
          type="button"
          onClick={deleted}
          className="delete-button"
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="img-size1"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
