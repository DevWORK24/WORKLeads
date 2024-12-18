import React,{useReducer, createContext, useContext} from 'react'
import { ClientContext } from 'graphql-hooks';

const initialState={
    user:null
}

//create context
const AuthContext=createContext({
    user:null,
    login:(userData)=>{},
    logout:()=>{}
});

//reducers
function authReducers(state,action){
    switch(action.type){
        case 'LOGIN':
        return {...state,user:action.payload}            
        case 'LOGOUT':
        return {...state,user:null}            
        default: return state
    }
}

function AuthProvider(props){
    const client=useContext(ClientContext)
    const [state, dispatch]=useReducer(authReducers,initialState)

    const login=(userData)=>{       
       client.setHeader('Authorization',`Bearer ${userData.token}`)
        dispatch({
            type:'LOGIN',
            payload:userData
        })
    }

    function logout(){
      client.removeHeader('Authorization')
        dispatch({type:'LOGOUT'})
    }

    return (<AuthContext.Provider value={{user:state.user,login,logout}} {...props}/>)
}

export { AuthContext , AuthProvider}