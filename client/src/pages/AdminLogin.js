import React, { useState } from 'react'
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

import { LoginAdmin } from '../services/adminLogin';

const AdminLogin = () => {

  const [AdminInfo , setAdminInfo] = useState({
    username:"",
    password:""
  })

  const handleAdminLogin = (AdminInfo) => {
    LoginAdmin(AdminInfo)
  }


  return (
       <Grid container sx={{p:10}} spacing={0} style={{ minHeight: '70vh', backgroundColor:'white', display:'flex', justifyContent:'center' }}>

       <Box component="form" style={{backgroundColor:'#ffff', border:'1px solid #d30000'}}> 

          <Grid item xs={12} sx={{pt:5, px:5}} style={{display:"flex" ,alignItems:"center", justifyContent:"center"}} >
            <TextField style={{width:'30vw'}} id="outlined-basic" label="Username" variant="outlined" 
             onChange={(e) => {
                            setAdminInfo({...AdminInfo, username: e.target.value})
                            }}
            />
          </Grid>

          <Grid item xs={12} sx={{pt:3,px:5}} style={{display:"flex" ,alignItems:"center", justifyContent:"center" }}>
            <TextField style={{width:'30vw'}} id="outlined-basic" label="Password" variant="outlined"  
            onChange={(e) => {
                            setAdminInfo({...AdminInfo, password: e.target.value})
                            }}
            />
            
          </Grid>
          

          <Grid item xs={12} sx={{pt:7,px:5}} style={{display:"flex" ,alignItems:"center", justifyContent:"center"}}>
              <Button style={{backgroundColor:'#d30000'}} variant="contained" component="label"
              onClick={() =>  {handleAdminLogin(AdminInfo)}}
              >
                  < NavLink style={{textDecoration:"none" , color:"white"}} to="/AdminManagement">
                  Login As Admin
                  </NavLink>
              </Button>
              
          </Grid>

       </Box>

    </Grid>
  )
}

export default AdminLogin