import TransactionModal from "./TransactionModal";
import { GlobalContext } from "../context/GlobalContext";
import { useRef, useContext } from "react";
import "../shared/css/header.css";

export default function Header() {
  const { setTransactionToUpdate } = useContext(GlobalContext);
  const dialog = useRef();

  function openTransactionModal() {
    setTransactionToUpdate(null);
    dialog.current.open();
  }

  return (
    <>
      <header className="main-header">
        <h2 className="main-header__title">Expense Tracker</h2>
        <div className="main-header__actions">
          <button className="add-transaction" onClick={openTransactionModal}>
            Add Transaction
          </button>
        </div>
      </header>
      <TransactionModal ref={dialog} />
    </>
  );
}
