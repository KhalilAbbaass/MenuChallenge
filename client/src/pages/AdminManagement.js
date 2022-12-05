import React from 'react'
import { useEffect ,useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { getAllCategories } from '../services/getCategories'
import { addCategory } from '../services/addcategory';
import { deleteCategory } from '../services/deleteCategory';
import { editCategory } from '../services/editCategory';
import { getAllCategoriesWithItems } from '../services/getAllCategoriesWithItems';
import { addItem } from '../services/addItem';
import { deleteItem } from '../services/deleteItem';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const AdminManagement = () => {

  //modal

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //closing modal


  //modal 2

    const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  //closing modal 2

  const [CategoryBeingAdded, setCategoryBeingAdded] = useState({
    name: ""
  });

  const handleAddCategory = (e) => {
    e.preventDefault()
    addCategory(CategoryBeingAdded).then((result) => {
      console.log("Category has been added")
    })
  }

  const handleDeleteCategory = (_id) => {
    deleteCategory(_id)
  }

  const [CategoryBeingEdited , setCategoryBeingEdited] = useState({
    name:""
  })

  const handleEditCategory = (_id, CategoryBeingEdited) => {
    editCategory(_id, CategoryBeingEdited)
  }


  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then(result => {
      setAllCategories(result.data)
    }).catch(err => {
      console.log(err)
    })
  },[allCategories])

  const [allCategoriesWithItems, setAllCategoriesWithItems] = useState([])


  useEffect(() => {
    getAllCategoriesWithItems().then(result => {
      setAllCategoriesWithItems(result.data)
      

    }).catch(err => {
      console.log(err)
    })
  },[allCategoriesWithItems])

  const [ItemBeingAdded, setItemBeingAdded] = useState({
    name:"",
    price:"",
    description:"",
    image:""
  })

 const handleAddItem = (CatID, ItemBeingAdded) => {
    addItem(CatID, ItemBeingAdded)
  }

 const handleDeleteItem = (CategoryID, ItemID) => {
  deleteItem(CategoryID, ItemID)
 }

  return (
    <Grid container style={{alignItems:"center", justifyContent:"center", display:"flex", padding:"2rem"}}>
    <Grid item xs={11}>
            <Button onClick={handleOpen}
                style={{ float:'left', marginBottom:"1rem", backgroundColor:"#d30000"}}
                startIcon={<AddIcon/>}sx={{m: 1}} 
                variant="contained" 
                size="medium">
                Add Category
            </Button>
          <h2 style={{paddingTop:"1rem"}}> Categories </h2>
     <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="caption table" >
        
        <TableHead>
          <TableRow style={{border:"3px solid #d30000"}}>
            <TableCell>Category Name</TableCell>
            <TableCell align="center">Actions</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody style={{border:"2px solid #d30000"}}>
          {allCategories.map((item ,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="center">
              <Button style={{backgroundColor:"yellow" , color:"black" , space:"1rem"}} variant="contained"
              onClick={handleOpen2}
              >Edit</Button>
              <Button style={{backgroundColor:"#d30000"}} variant="contained"
               onClick={() => handleDeleteCategory(item._id) }
              >Delete</Button>
              
              </TableCell>
                  <Modal
                      open={open2}
                      onClose={handleClose2}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box style={{border:"0.1rem solid red", boxShadow:"1rem red"}} sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Edit Category
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField id="outlined-basic" label="Edit Category" variant="outlined" 
                           onChange={(e) => {
                              setCategoryBeingEdited({...CategoryBeingEdited, name: e.target.value})
                            }}
                        />
                          <Button style={{right:"-1rem" , backgroundColor:"#d30000"}} variant="contained"
                          onClick={() => handleEditCategory(item._id , CategoryBeingEdited) }
                          >Confirm</Button>
                        </Typography>
                      </Box>
                    </Modal>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>










    {/* space between tables */}

    <h2 style={{paddingTop:"3rem"}}> Items </h2>

        <br/>
    <div>
      <TextField style={{left:'5rem'}} id="outlined-basic" label="name" variant="outlined"
                            onChange={(e) => {
                            setItemBeingAdded({...ItemBeingAdded, name: e.target.value})
                            }}
                        />
                        <br/><br/>
                        <TextField style={{left:'5rem'}} id="outlined-basic" label="price" variant="outlined"
                            onChange={(e) => {
                            setItemBeingAdded({...ItemBeingAdded, price: e.target.value})
                            }}
                        />
                        <br/><br/>
                        <TextField style={{left:'5rem'}} id="outlined-basic" label="description" variant="outlined"
                            onChange={(e) => {
                            setItemBeingAdded({...ItemBeingAdded, description: e.target.value})
                            }}
                        />
                        <br/><br/>
                        <TextField style={{left:'5rem'}} id="outlined-basic" label="image link" variant="outlined"
                            onChange={(e) => {
                            setItemBeingAdded({...ItemBeingAdded, image: e.target.value})
                            }}
                        />      
    </div>                    

     <div style={{left:"5rem"}}>
      {allCategories.map((item) => (
        <>
         <Button 
         style={{backgroundColor:"#d30000"}}
         startIcon={<AddIcon/>}sx={{m: 1}} 
         variant="contained" 
         size="small"
         onClick={() => handleAddItem(item._id,ItemBeingAdded)}
         >
         item in {item.name}           
        </Button> 
        </>
      ))}
    </div>                       



    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="caption table" >
        
        <TableHead>
          <TableRow style={{border:"3px solid #d30000"}}>
            <TableCell>Category</TableCell>
            <TableCell align="left">Item</TableCell>

          </TableRow>
        </TableHead>
        <TableBody style={{border:"2px solid #d30000"}}>
          {allCategoriesWithItems.map((row, r) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.name} <br/>

              </TableCell>
                {row.items.map((itemrow, rr) => (
                  <div>
                  <TableCell style={{width:'10rem'}}  align="left">{itemrow.name}</TableCell>
                  <TableCell style={{width:'10rem'}} align="left">{itemrow.price}</TableCell>
                  <TableCell style={{width:'20rem'}} align="left">{itemrow.description}</TableCell>
                  <TableCell style={{width:'10rem'}} align="left">
                     <img
                        src={`${itemrow.image}`}
                        style={{height:"3rem", width:"3rem"}}
                        alt="imggg"
                      />
                  </TableCell>
                  <TableCell style={{width:'10rem'}} align="left">
                    
                    <Button style={{left:"1rem", backgroundColor:'#d30000'}} variant="contained"
                    onClick={() => handleDeleteItem(row._id, itemrow._id)}
                    >Delete</Button>
                  </TableCell>

                  </div>
                ))}
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{border:"0.1rem solid red", boxShadow:"1rem red"}} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField id="outlined-basic" label="Category Name" variant="outlined" 
          onChange={(e) => {
            setCategoryBeingAdded({...CategoryBeingAdded, name: e.target.value})
          }}
          />
          <Button style={{right:"-1rem" , backgroundColor:"#d30000"}} variant="contained"
          onClick={handleAddCategory}
          >Add-Category</Button>
          </Typography>
        </Box>
      </Modal>  

    </Grid>
    </Grid>
  )
}

export default AdminManagement