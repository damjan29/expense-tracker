import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";
import { initialFormState } from "../context/GlobalContext";
import "../shared/css/transaction-modal.css";

const TransactionModal = forwardRef(function TransactionModal(props, ref) {
  const dialog = useRef();
  const { formData, setFormData, handleFormSubmit, transactionToUpdate } =
    useContext(GlobalContext);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  useEffect(() => {
    if (!transactionToUpdate) {
      setFormData(initialFormState);
      return;
    }
    
    dialog.current.showModal();
    setFormData((prevData) => ({ ...prevData, ...transactionToUpdate }));
    
  }, [transactionToUpdate]);

  function handleFormChange(ev) {
    const value = ev.target.value;
    setFormData((prevData) => {
      return {
        ...prevData,
        [ev.target.name]: event.target.type === "number" ? +value : value,
      };
    });
  }

  function submitForm(ev) {
    ev.stopPropagation();
    handleFormSubmit(formData);
  }

  return (
    <dialog ref={dialog} className="transaction-modal">
      <div className="transaction-modal__header">
        <h2 className="transaction-modal__title">Add New Transaction</h2>
        <button
          className="transaction-modal__close"
          onClick={() => dialog.current.close()}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="transaction-modal__content">
        <form
          method="dialog"
          className="transaction-modal__form"
          onSubmit={submitForm}
        >
          <div className="form-control">
            <label htmlFor="description">Enter Description</label>
            <input
              type="text"
              value={formData.description || ""}
              name="description"
              id="description"
              onChange={handleFormChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Enter Amount</label>
            <input
              type="number"
              value={formData.amount || ""}
              name="amount"
              id="amount"
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="income" className="radio-label">
              <input
                type="radio"
                name="type"
                value="income"
                id="income"
                onChange={handleFormChange}
                checked={formData.type === "income"}
              />
              Income
            </label>
            <label htmlFor="expense" className="radio-label">
              <input
                type="radio"
                name="type"
                value="expense"
                id="expense"
                onChange={handleFormChange}
                checked={formData.type === "expense"}
              />
              Expense
            </label>
          </div>
          <div className="transaction-modal__footer">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => dialog.current.close()}
            >
              Cancel
            </button>
            <button className="btn btn-save">Save</button>
          </div>
        </form>
      </div>
    </dialog>
  );
});

export default TransactionModal;
