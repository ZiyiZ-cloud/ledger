import React, {useState,useEffect,useContext} from 'react';
import LedgerApi from '../Api/api';
import LoadingSpinner from '../common/LoadingSpinner'
import UserContext from '../auth/UserContext';
import ExpenseCardList from './ExpenseCardList';
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker,MonthPicker,YearPicker,CalendarPicker,LocalizationProvider} from '@mui/lab';
import { Grid,Button,Box , Container} from '@mui/material';




const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

function SearchMonthly(){
    const [date, setDate] = useState(null)


    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        date: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const history = useNavigate();

    const [expenses, setExpenses] = useState(null);

    const CurrentUser = currentUser.user.username;;

    useEffect(function getExpenses(){
        getUserExpenses(CurrentUser);
    },[]);

    let newDate = new Date;

    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();


    async function getUserExpenses(username){
        let result = await LedgerApi.getByMonth(username,year,month);
        console.log(result);
        setExpenses(result)
    }

    function addExpense (evt){
        evt.preventDefault();
        history(`/expenses/add`);
    }

    /** Handle form data changing */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormErrors([]);
        }

    function selectedMonth (evt){
        evt.preventDefault();
        let newYear;
        let newMonth;
        let newDate = new Date(date)
        newYear = newDate.getFullYear();
        newMonth = newDate.getMonth()+1;
        console.log(newMonth.newYear);
        history(`/expenses/year/${newYear}/month/${newMonth}`);
    }

    if(!expenses) return <LoadingSpinner />;

    console.log(expenses.length);

    return (
        <div>
           
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <MonthPicker
                        date={date}
                        minDate={minDate}
                        maxDate={maxDate}
                        onChange={(newDate) => setDate(newDate)}
                    />
                    </Grid>
                    <Grid item xs={11} md={5}>
                    
                    </Grid>
                    <Box textAlign='center'>
                    <Button variant='contained' style={{justifyContent: 'center'}} onClick={selectedMonth}>
                        Search By Month
                    </Button>
                    </Box>
                </Grid>
                </LocalizationProvider>
                
        </div>
    )

}

export default SearchMonthly;