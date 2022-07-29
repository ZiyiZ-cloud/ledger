import {useNavigate} from 'react-router';
import UserContext from '../auth/UserContext';
import {useContext} from 'react';
import LedgerApi from '../Api/api';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function PopupUser({ popup,setPopup }) {

    const history = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);


    function backToProfile (evt){
        evt.preventDefault();
        setPopup({show: false});
        history(`/profile`);
    }

    async function deleteUser (evt){
        evt.preventDefault();
        await LedgerApi.deleteUser(currentUser.user.username);
        history(`/`);
    }

    return (
      <div className="modal">
        <div className="modal_box">
          <p>You sure you wanna delete?</p>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Button fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} onClick={backToProfile}>Cancel</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Button fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'red'}} onClick={deleteUser}>Confirm</Button>
            </Grid>
            </Grid>

        </div>
      </div>
    );
  }
  
  export default PopupUser;