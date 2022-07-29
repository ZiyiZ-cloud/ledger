import React, { useEffect,useState } from 'react'
import LedgerApi from '../Api/api';
import LoadingSpinner from './LoadingSpinner';
import { Bar } from 'react-chartjs-2';
import { Grid } from '@mui/material';




function LineChart({username,year,month,chartTitle}) {

  const [income,setIncome] = useState(null);
  const [expense,setExpense] = useState(null);

  async function getdailyData(username,year,month){
    setIncome(await LedgerApi.getIncomesByDay(username,year,month));
    setExpense( await LedgerApi.getExpensesByDay(username,year,month));
  }

    useEffect(function getDailyData(){
      getdailyData(username,year,month);
      console.log(expense,income);
    },[])

    if(!income) return <LoadingSpinner />;
    if(!expense) return <LoadingSpinner />;

    let data = {
      labels: expense.dailyExpense.map(x=>x[0]),
      datasets: [
        {
          id: 1,
          label: 'Expnese',
          data: expense.dailyExpense.map(x=>x[1]),
          borderColor: "red",
          backgroundColor: "red",
        },
        {
          id: 2,
          label: 'Income',
          data: income.dailyIncome.map(x=>x[1]),
          borderColor:"blue",
          backgroundColor:"blue",
        },
      ],
    }

    return (
      <div className="container mt-5">
      <Grid item xs={9}>
        <h2>{chartTitle}</h2>
        <Bar
          datasetIdKey='id'
          data={data}
        />
      </Grid>
      </div>
      
    )
}

export default LineChart;
