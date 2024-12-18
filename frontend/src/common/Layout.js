import React, {useState,useContext} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import { Outlet } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';

const drawerWidth = 100;

export default function Layout(props) {
const userDetails=useContext(AuthContext)
const [activeMenuIdx,setActiveMenuIdx]=useState()

   //sidebar
  const drawer = (
    <div>  
      <List>
        {[{name:"Find Referrals",toLink:'/fNSRfl'},{name:'User List',toLink:'/userList'},{name:'Photos',toLink:'/dashboard'},{name:'Photos',toLink:'/dashboard'},{name:'Logout',toLink:'/'}].map((text, index) => (          
          <Link to={text.toLink} key={index} style={{textDecoration:'none',color:'black'}} onClick={()=>setActiveMenuIdx(index)}>  
          <ListItem key={index} disablePadding divider={true} style={{backgroundColor:(activeMenuIdx===index)?"grey":''}} >
            <ListItemButton selected={activeMenuIdx===index?true:false}> 
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>      
    </div>
  );  

  return (
      userDetails.user!==null?
      <Box sx={{ display: 'flex' }}> 
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >       
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
          {props.children}
      </Box>
      </Outlet>
      </Box>
      :
      <LoginPage/>        
  );
}