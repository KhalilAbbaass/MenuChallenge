import React from 'react'
import { useEffect ,useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SettingsIcon from '@mui/icons-material/Settings';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Link  } from "react-scroll";
import { NavLink } from 'react-router-dom';

import { getAllCategories } from '../services/getCategories';





const CategoryBar = () => {

  const [allCategories, setAllCategories] = useState([]);


useEffect(() => {
  getAllCategories().then(result => {
    setAllCategories(result.data)
  }).catch(err => {
    console.log(err)
  })
},[allCategories])









  const [anchorElNav, setAnchorElNav] = React.useState(null);
    

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };




  return (
    <AppBar position="static" style={{background: "#d30000"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

       

          <RestaurantIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Menu
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {allCategories.map((item, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link style={{textDecoration: 'none', color:'black'}} smooth spy to ={`${item.name}`}><RestaurantMenuIcon style={{fontSize:"1rem"}}/>{item.name}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>

           <Button style={{float:"left" , color:"#ffff"  }}>
            < NavLink style={{textDecoration:"none" , color:"white"}} to="AdminLogin">
            < SettingsIcon/>Admin
            </NavLink>
            
            
            </Button>

          </Box>
          <RestaurantIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Menu
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {allCategories.map((item , y) => (
              <Button
                key={y}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{textDecoration: 'none', color:'White'}} smooth spy to ={`${item.name}`}><RestaurantMenuIcon style={{fontSize:"1rem"}}/>{item.name}</Link>
              </Button>
            ))}

             <Button style={{marginLeft:"auto",  color:"#ffff" }}> 
              < NavLink style={{textDecoration:"none" , color:"white"}} to="AdminLogin">
                   < SettingsIcon/>Admin
              </NavLink>            
             </Button>
          </Box>


          
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default CategoryBar