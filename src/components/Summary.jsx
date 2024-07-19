import { useEffect, useState } from "react";
import "../shared/css/summary.css";
import { PieChart } from "@mui/x-charts/PieChart";

const toLower = (str) => str?.toLowerCase();

export default function Summary({ totalIncome = 0, totalExpense = 0 }) {

  const [chartData, setChartData] = useState([
    { id: 0, value: 100, label: "Income" },
    { id: 1, value: 0, label: "Expense" },
  ]);

  useEffect(() => {
    if (totalIncome === 0 && totalExpense === 0) return;

    chartData.forEach((element) => {
      element.value =
        toLower(element.label) === "income" ? totalIncome : totalExpense;
    });

    setChartData((prevData) => [...chartData]);
  }, [totalIncome, totalExpense]);

  // console.log('chartData => ', chartData);

  return (
    <div className="summary">
      <div className="summary-balance">
        <p className="summary-balance__title">
          Balance is $ {totalIncome - totalExpense}
        </p>
        <div className="summary-balance__rows">
          <div className="summary-balance__row">
            <h4 className="summary-balance__row-heading">$ {totalIncome}</h4>
            <div className="summary-balance__row-text">Total Income</div>
          </div>
          <div className="summary-balance__row">
            <h4 className="summary-balance__row-heading">$ {totalExpense}</h4>
            <div className="summary-balance__row-text">Total Expense</div>
          </div>
        </div>
      </div>
      <div className="summary-chart">
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
}
