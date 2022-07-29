import * as React from 'react';
import {  Typography } from '@mui/material';
import Button from '@mui/material/Button';
import HomepageLayout from './HomepageLayout';
import  {useContext} from 'react';
import UserContext from '../auth/UserContext';

export default function Homepage() {
  const {currentUser, setCurrentUser} = useContext(UserContext);

  return (
    <div style={{  
      backgroundImage: `url(https://source.unsplash.com/random)`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
    <HomepageLayout
      sxBackground={{
      }}
    >
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Track Your Expenses!
      </Typography>
      {!currentUser && <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Create your account today and keep track of your spending activities.
      </Typography>}
      {!currentUser && <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/register"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>}
      {currentUser && <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/expenses"
        sx={{ minWidth: 200 }}
      >
        Go Track Your Expenses
      </Button>}
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </HomepageLayout>
    </div>
  );
}