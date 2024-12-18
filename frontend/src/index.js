import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import client from './GraphqlClient/graphqlClient'
import { ClientContext } from 'graphql-hooks';
import {  BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <ClientContext.Provider value={client}>
      <BrowserRouter>
      <AuthProvider>      
        <React.StrictMode>          
            <App/>
        </React.StrictMode>      
      </AuthProvider>
      </BrowserRouter>
    </ClientContext.Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
