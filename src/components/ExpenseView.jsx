import "../shared/css/expense-view.css";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export default function ExpenseView({
  type,
  transactions = [],
  onDeleteTransaction,
  onEditTransaction,
}) {
  return (
    <div className={`expense-view ${type.toLowerCase()}`}>
      <h2 className="expense-view__title">{type}</h2>
      {transactions.length > 0 &&
        transactions.map((transaction) => {
          return (
            <div key={transaction.id} className="expense-view__item">
              <span className="expense-view__item--desc">
                {transaction.description}
              </span>
              <div className="expense-view__item--data">
                <span className="expense-view__item--amount">
                  $ {transaction.amount}
                </span>
                <span
                  className="expense-view__item--icon edit"
                  onClick={() => onEditTransaction(transaction)}
                >
                  <FaEdit />
                </span>
                <span
                  className="expense-view__item--icon"
                  onClick={() => onDeleteTransaction(transaction)}
                >
                  <FaTrashAlt />
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
