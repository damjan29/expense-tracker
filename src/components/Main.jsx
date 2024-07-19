import Header from "./Header";
import Summary from "./Summary";
import ExpenseView from "./ExpenseView";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const ALL_TRANSATIONS_KEY = "all_transactions";

const TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
};

export default function Main() {
  const {
    allTransactions,
    totalIncome,
    setTotalIncome,
    totalExpense,
    setTotalExpense,
    handleDeleteTransaction,
    setTransactionToUpdate,
  } = useContext(GlobalContext);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    if (allTransactions?.length <= 0) {
      const transactions =
        JSON.parse(localStorage.getItem(ALL_TRANSATIONS_KEY)) || [];
      allTransactions.push(...transactions);
    }

    allTransactions.forEach((item) => {
      item.type === "income"
        ? (income += parseFloat(item.amount))
        : (expense += parseFloat(item.amount));
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    localStorage.setItem(ALL_TRANSATIONS_KEY, JSON.stringify(allTransactions));
  }, [allTransactions]);

  function deleteTransaction(item) {
    if (!confirm("Are you sure?")) return;
    handleDeleteTransaction(item);
  }

  function editTransaction(item) {
    setTransactionToUpdate(item);
  }

  console.log("Main component called!!");

  return (
    <div className="main-wrapper">
      <Header></Header>
      <Summary totalIncome={totalIncome} totalExpense={totalExpense}></Summary>
      <div className="expense-view-wrapper">
        <ExpenseView
          type={"Income"}
          transactions={allTransactions.filter(
            (item) => item.type === TYPES.INCOME
          )}
          onDeleteTransaction={deleteTransaction}
          onEditTransaction={editTransaction}
        ></ExpenseView>
        <ExpenseView
          type={"Expense"}
          transactions={allTransactions.filter(
            (item) => item.type === TYPES.EXPENSE
          )}
          onDeleteTransaction={deleteTransaction}
          onEditTransaction={editTransaction}
        ></ExpenseView>
      </div>
    </div>
  );
}
