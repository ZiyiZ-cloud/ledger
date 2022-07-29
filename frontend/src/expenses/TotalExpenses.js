import React, {useState,useEffect,useContext} from 'react';
import LedgerApi from '../Api/api';
import LoadingSpinner from '../common/LoadingSpinner'
import UserContext from '../auth/UserContext';
import ExpenseCardList from './ExpenseCardList';
import { useNavigate } from "react-router-dom";
import EarningCard from '../MUI/DashBoard/EarningCard';




function TotalExpenses(){

    const {currentUser, setCurrentUser} = useContext(UserContext);

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
        let result = await LedgerApi.getCurrentExpenses(username);
        console.log(result);
        setExpenses(result)
    }

    function addExpense (evt){
        evt.preventDefault();
        history(`/expenses/add`);
    }

    function currentMonth (evt){
        evt.preventDefault();
        history(`/expenses/currentmonth`);
    }

    function currentYear (evt){
        evt.preventDefault();
        history(`/expenses/year/${year}`);
    }

    if(!expenses) return <LoadingSpinner />;

    console.log(expenses.length);

    return (
        <div>
            <div>
{/*                 
                {expenses.expenses.length
                    ?<div><ExpenseCardList expenses={expenses.expenses}/>
                        </div>
                    :<p className="lead">Sorry, no results were found!</p>
                } */}
                <div><ExpenseCardList expenses={expenses.expenses}/>
                        </div>
               
            </div>
            
        </div>
    )

}

export default TotalExpenses;