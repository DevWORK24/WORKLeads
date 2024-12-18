import React,{useContext} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {  useMutation } from 'graphql-hooks'
import { AuthContext   } from '../auth/AuthContext';
import {useNavigate} from 'react-router-dom'
import Grid from '@mui/material/Grid';

// const LOGIN_USER1=`
// query loginUsers($EmailAddress:String,$Password:String){
//   loginUsers(EmailAddress:$EmailAddress,Password:$Password){
//     token
//     status
//     tokenExpirationTime
//   }
// }
// `

const LOGIN_USER=`
mutation loginWORKer($loginWORKerI:loginWORKerInput){
  loginWORKer(input:$loginWORKerI){
   token
   status
   tokenExpirationTime
  }
}`

export default function LoginPage() {
  const authContext=useContext(AuthContext)
  let navigate=useNavigate()
  
  const [loginCreds, setLoginCreds] = React.useState({
    emailAddress:'',
    password:''
  });
  const [errLoginCreds, setErrLoginCreds] = React.useState({
    errEmailAddress:false,
    errEmailAddressText:'',
    errPassword:false,
    errPasswordText:''
  });
  const [loginUsersMutation]=useMutation(LOGIN_USER)
  // const [loginUsersMutation1]=useManualQuery(LOGIN_USER1,{
  //   variables:{
  //       EmailAddress:loginCreds.emailAddress ,
  //       Password: loginCreds.password
  //   }
  // })
  const [lgGQLErrors,setLgGQLErrors]=React.useState('')


 const handleChange=(name)=>(event) =>{
  setLgGQLErrors('') 
  setErrLoginCreds({errEmailAddress:false,errEmailAddressText:'',errPassword:false,errPasswordText:''});
  switch(name){
    case 'emailAddress': setLoginCreds({...loginCreds,[name]:event.target.value})         
    break;
    case 'password':setLoginCreds({...loginCreds,[name]:event.target.value})     
    break;
    default:return false
  }
 }

  const handleChangeErrors=()=>{
    setLgGQLErrors('') 
    let regExpCheck=''
    if(loginCreds.emailAddress.length>3){
      regExpCheck=/^[A-Z]{1}[a-z]+([._]{1}[A-Z]{1}[a-z]+)*$/       
       if(loginCreds.emailAddress.match(regExpCheck)===null)
        {setErrLoginCreds({errEmailAddress:true,errEmailAddressText:"Starts with uppercase letter followed by lowercase letter(s) || Starts with uppercase letter followed by lowercase letter(s) followed by special characters(._) followed by uppercase letter followed by lowercase letter(s)",errPassword:false,errPasswordText:''})
        return true}      
    }
     if(loginCreds.password.length>0){
      regExpCheck=/^[A-Z]{1}[a-z]+([._]{1}[A-Z]{1}[A-Za-z]+)*@[a-z]{3,}.[a-z]{2,4}$/       
        if(loginCreds.password.match(regExpCheck)===null)
        {setErrLoginCreds({errEmailAddress:false,errEmailAddressText:'',errPassword:true,errPasswordText:"Starts with uppercase letter followed by lowercase letter(s) || Starts with uppercase letter followed by lowercase letter(s) followed by special characters(._) followed by uppercase letter followed by lowercase letter(s) followed by @ followed by lowercase letters(minlength-3) followed by . followed by lowercase letters(minlength-2 & maxlength-4)"})
         return true}      
    }
    if((loginCreds.emailAddress.length===0||loginCreds.emailAddress.length<3)&&(loginCreds.password.length===0)){
       setErrLoginCreds({errEmailAddress:true,errEmailAddressText:loginCreds.emailAddress.length===0?"Enter email address":loginCreds.emailAddress.length<3?"Min length-3":"Enter email address",errPassword:true,errPasswordText:"Enter password"});
       return true}
     if(loginCreds.emailAddress.length===0){
      setErrLoginCreds({errEmailAddress:true,errEmailAddressText:"Enter email address",errPassword:false,errPasswordText:''})
      return true}   
     if(loginCreds.password.length===0){
      setErrLoginCreds({errEmailAddress:false,errEmailAddressText:"",errPassword:true,errPasswordText:"Enter password"});
      return true}
     
  }

const loginMutation=async ()=>{
  //if(!handleChangeErrors())
  {try{
        await loginUsersMutation({
          variables:{
            loginWORKerI:{
              Email:loginCreds.emailAddress ,
              Password: loginCreds.password
            }
          }
        })
        .then(async({data,error})=>{
                if(error!==undefined) setLgGQLErrors(`${error.graphQLErrors!==undefined? "Invalid Credentials":''} ${error.fetchError!==undefined? error.fetchError:''} ${error.httpError!==undefined? error.httpError:''}`) 
                else{ authContext.login(data.loginWORKer)
                      navigate("/landingScreen")
                    } 
          })
        .catch((err)=>{throw err})
    }
    catch(err){throw err}
  }
}

  return (
    <Box sx={{ flexGrow: 1 }}>
       <Grid container spacing={2}>
           <Grid item xs={8}>
            <span style={{color:'red'}}>{lgGQLErrors}</span>
           </Grid>
            <Grid item xs={8}>
              <TextField
                required
                id="outlined-name"
                label="Email Address"
                name="emailAddress"        
                value={loginCreds.emailAddress}
                onChange={handleChange('emailAddress')}        
                error={errLoginCreds.errEmailAddress}
                helperText={errLoginCreds.errEmailAddress && errLoginCreds.errEmailAddressText}
              />
            </Grid>            
            <Grid item xs={8}> 
              <TextField
                required
                id="outlined-name"        
                label="Password"
                name="password"        
                value={loginCreds.password}
                onChange={handleChange('password')}        
                error={errLoginCreds.errPassword}
                helperText={errLoginCreds.errPassword && errLoginCreds.errPasswordText}                
              />
            </Grid>            
            <Grid item xs={8}>
              <Button onClick={loginMutation} variant="contained" size="large">Login</Button>
            </Grid>      
     </Grid>      
    </Box>
  );
}
// regExp=/^[A-Za-z]+[A-Za-z0-9._]+@[A-Za-z]+.[A-Za-z]{2,4}$/
//{(event)=>setLoginCreds({...loginCreds,'emailAddress':event.target.value})}        
//{(event)=>setLoginCreds({...loginCreds,'password':event.target.value})}        