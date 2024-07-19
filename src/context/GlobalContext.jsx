import { createContext, useState } from "react";
import randomId from "../shared/helpers/generateRandomId";

export const initialFormState = {
  type: "income",
  amount: 0,
  description: "",
};

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState(initialFormState);
  const [allTransactions, setAllTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [transactionToUpdate, setTransactionToUpdate] = useState(null);

  function handleFormSubmit(data) {
    if (!data.description || !data.amount) return;

    if (data?.id) {
      updateTransaction(data);
    } else {
      createTransaction(data);
    }
  }

  function createTransaction(currentData) {
    setAllTransactions((prevData) => {
      return [
        ...prevData,
        {
          ...currentData,
          id: randomId(),
        },
      ];
    });
  }

  function updateTransaction(currentData) {
    setAllTransactions((prevData) => {
      return [
        ...prevData.filter((item) => item.id !== currentData.id),
        currentData,
      ];
    });
    setTransactionToUpdate(null);
  }

  function handleDeleteTransaction(item) {
    setAllTransactions((prevItems) => [
      ...prevItems.filter((transaction) => transaction.id !== item.id),
    ]);
  }

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        handleFormSubmit,
        allTransactions,
        setAllTransactions,
        totalIncome,
        setTotalIncome,
        totalExpense,
        setTotalExpense,
        handleDeleteTransaction,
        transactionToUpdate,
        setTransactionToUpdate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
