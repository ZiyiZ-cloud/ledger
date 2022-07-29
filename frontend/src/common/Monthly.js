import React, { useEffect,useState } from 'react'
import LedgerApi from '../Api/api';
import LoadingSpinner from './LoadingSpinner';
import { Bar} from 'react-chartjs-2';



function PieChart({username,year,month,chartTitle}) {

  const [categoryIncome,setCategoryIncome] = useState(null);
  const [categoryExpense,setCategoryExpense] = useState(null);

  async function getCategoryData(username,year,month){
    setCategoryIncome(await LedgerApi.getMonthlyCategoryIncome(username,year,month));
    setCategoryExpense( await LedgerApi.getMonthlyCategoryExpense(username,year,month));
  }

    useEffect(function getcategoryData(){
      getCategoryData(username,year,month);
      console.log(categoryExpense,categoryIncome);
    },[])

    if(!categoryExpense) return <LoadingSpinner />;
    if(!categoryIncome) return <LoadingSpinner />;

    let expensedata = {
      labels: categoryExpense.categoryExpense.map(x=>x[0]),
      datasets: [
        {
          id: 1,
          label: 'Expnese',
          data: categoryExpense.categoryExpense.map(x=>x[1]),
          borderColor: '',
          backgroundColor: 'orange',
        },
        {
            id: 2,
            label: 'Income',
            data: categoryIncome.categoryIncome.map(x=>x[1]),
            borderColor: "",
            backgroundColor:'#8a2be2',
          },
      ],
    }


    return (
      <div className="container mt-5">
      
        {chartTitle}
        <Bar
            style={{
                canvasHeight:"500px",
                canvasWidth:"500px",
            }}
          datasetIdKey='id'
          data={expensedata} 
          />
      </div>
    )
}

export default PieChart;