// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {bgColor, text, image, altvalue, totalMoney, test} = props
  return (
    <li className={bgColor}>
      <img src={image} className="img-size" alt={altvalue} />
      <div>
        <p className="paragraph1">{text}</p>
        <p className="heading1" testid={test}>
          Rs {totalMoney}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
