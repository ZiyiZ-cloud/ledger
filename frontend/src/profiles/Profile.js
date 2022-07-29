import React, {useState,useEffect,useContext}  from 'react';
import LedgerApi from '../Api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';
import { useNavigate } from "react-router-dom";
import PopupUser from '../common/PopDeleteUser';
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

function Profile(){
    const history = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [popup, setPopup] = useState({
        show: false
      });
    function handleSubmit (evt){
        evt.preventDefault();
        history(`/${currentUser.user.username}/edit`);
    }

    function deleteUser (evt){
        evt.preventDefault();
        setPopup({show:true});
    }

    if(!currentUser.user.username){
        history(`/`);
    }

    return (
        <div>
            
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Username: {currentUser.user.username}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                 First Name: {currentUser.user.first_name}
              </Grid>
              <Grid item xs={12} sm={6}>
              Last Name: {currentUser.user.last_name}

              </Grid>
              <Grid item xs={12}>
              Email: {currentUser.user.email}

              </Grid>
            </Grid>
            <Button
                onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit User Info
            </Button>
            <Button
                onClick={deleteUser}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:'red'}}
            >
              Delete User
            </Button>
            {popup.show && <PopupUser popup={popup} setPopup={setPopup} />}
          </Box>
        </Box>
      </Container>
        </div>
    )

}

export default Profile;