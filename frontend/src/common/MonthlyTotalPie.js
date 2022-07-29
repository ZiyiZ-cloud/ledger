import React from 'react'
import { Pie } from 'react-chartjs-2';



function TotalPieChart({totalIncome, totalExpense}) {

    let data = {
        labels: ["Income", "Expense"],
        datasets: [{
            data: [totalIncome, totalExpense],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
            ],
            hoverOffset: 4
          }]
      }

    let incomePercent = (totalIncome/(totalIncome+totalExpense)*100).toFixed(2)+"%";
    let expensePercent = (totalExpense/(totalIncome+totalExpense)*100).toFixed(2)+"%";

    return (
      <div className="container mt-5">
            <Pie 
                    data={data}
            />
            Income Percentage : {incomePercent}
            Expense Percentage : {expensePercent}

      </div>
    )
}

export default TotalPieChart;