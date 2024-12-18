import PaginationComponent from "../components/Pagination";
import Dashboard from "./Dashboard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from "react";

const MainDashboard=()=>{
    const [currenPgNum,setCurrenPgNum]=useState()
    const [totalCount,setTotalCount]=useState(0)    
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            <Grid item xs={8}>
                <Dashboard currenPgNum={currenPgNum} handleTotalCount={(totalCountValue)=>setTotalCount(totalCountValue/parseInt(process.env.REACT_APP_PAGE_SIZE)) }/>
            </Grid>
            <Grid item xs={8}>            
               {totalCount!==0 && <PaginationComponent totalCount={totalCount} onPageChange={(pgNumber)=>setCurrenPgNum(pgNumber)}/>}
            </Grid>
            </Grid>
        </Box>
    )
}

export default MainDashboard;

