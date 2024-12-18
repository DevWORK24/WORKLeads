import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';


export default function RTableComponent(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{backgroundColor:'black'}}>
          <TableRow key={1}>
            {props.columns.map((col,i)=> <TableCell style={{color:'white'}}>{col}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
            {props.tRow} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}