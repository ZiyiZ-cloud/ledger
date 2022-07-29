import React, { useState, useContext,useEffect } from "react";
import LedgerApi from "../Api/api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";
import { useNavigate,useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { InputLabel,Select,MenuItem} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker,MonthPicker,YearPicker,CalendarPicker,LocalizationProvider} from '@mui/lab';


const theme = createTheme();

function UpdateExpense() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const history = useNavigate();

    let {username, id} = useParams()

    useEffect(function getcurrentExpense() {
        async function getCurrentExpense() {
            let currentExpense = await LedgerApi.getExpenseById(username,id);
            setFormData({amount:currentExpense[0].amount,
                    category:currentExpense[0].category,
                    detail:currentExpense[0].detail,
                    date:currentExpense[0].date.split('T')[0]})
        }
        getCurrentExpense();
    },[]);


    const [formData, setFormData] = useState({
      amount: "",
      category: "",
      detail: "",
      date: "",
      username:currentUser.user.username,
    });
    const [formErrors, setFormErrors] = useState([]);
  
    // switch to use our fancy limited-time-display message hook
    const [saveConfirmed, setSaveConfirmed] = useState(false);
  
    async function handleSubmit(evt) {
      evt.preventDefault();
  
      let expenseData = {
        amount: formData.amount,
        category: formData.category,
        detail: formData.detail,
        date: formData.date,
      };
  
      let username = currentUser.user.username;
      let newExpense

      if(expenseData.category === ""){
        setFormErrors([]);
      }

      try {
        newExpense = await LedgerApi.updateExpense(username,id,expenseData);
      } catch (errors) {
        setFormErrors(errors);
        return;
      }
  
      history(`/expenses`);
  
    }
  
    /** Handle form data changing */
    function handleChange(evt) {
      const { name, value } = evt.target;
      if(name === "category" && value ===""){
        setFormErrors(['Category is required']);
      }
      setFormData(f => ({
        ...f,
        [name]: value,
      }));
      setFormErrors([]);
    }

    if(!formData) return <LoadingSpinner />;

  
    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          
          <ThemeProvider theme={theme}>
        
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderColor: 'white',
            }}
          >
            <Typography component="h1" variant="h5">
              Update Your Expense
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
              <p>Enter a positive number for Income or a negative number for Expense</p>
                  <TextField
                    required
                    fullWidth
                    name="amount"
                    label="Amount"
                    type="number"
                    id="amount"
                    autoComplete="new-username"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                <InputLabel id="categorylabel">Category</InputLabel>
                  <Select
                    label="category"
                    id="category"
                    fullWidth
                    value={formData.category}
                    label="Category"
                    required
                    name = 'category'
  
                    onChange={handleChange}
                  >
                    <MenuItem value="housing">Housing</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="fun">Fun</MenuItem>
                    <MenuItem value="child-expenses">Child Expenses</MenuItem>
                    <MenuItem value="insurance">Insurance</MenuItem>
                    <MenuItem value="healthcare">Healthcare</MenuItem>
                    <MenuItem value="utilities">Utilities</MenuItem>
                    <MenuItem value="personal-care">Personal Care</MenuItem>
                    <MenuItem value="taxes">Taxes</MenuItem>
                    <MenuItem value="transportation">Transportation</MenuItem>
                    <MenuItem value="gifts">Gifts</MenuItem>
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="givings">Givings</MenuItem>
                    <MenuItem value="house-supplies">House Supplies</MenuItem>
                    <MenuItem value="consumer-debt">Consumer Debt</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="savings">Savings</MenuItem>
                    <MenuItem value="pets">Pets</MenuItem>
                    <MenuItem value="services-membership">Services Membership</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="detail"
                    label="Detail"
                    name="detail"
                    autoComplete="detail"
                    value={formData.detail}
                        onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id='date'
                        type="date"
                        name="date"
                        className="form-control"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                {formErrors.length
                      ? <Alert type="danger" messages={formErrors} />
                      : null}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update Your Expense
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
        </div>
    );
  }
  
  export default UpdateExpense;
  