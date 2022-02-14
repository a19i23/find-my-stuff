import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function LoginBar() {
  return (
    <>
      <AppBar className="bg-white dark:bg-gray-900">
        <Toolbar>
          <Typography
            className="font-light"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            findMyStuff
          </Typography>
          <Button className="font-light" href="/api/auth/login" color="inherit">
            Login
          </Button>
          <Button
            className="font-light"
            href="/api/auth/logout"
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
