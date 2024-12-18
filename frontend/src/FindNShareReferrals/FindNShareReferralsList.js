import  { useEffect, useState } from "react";
import { useQuery } from "graphql-hooks";
import RTable from "../components/Table";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const FIND_SHARE_WORK_LEADS=`query fetchWORKLeadList($WORKerAssigned:String){
  fetchWORKLeadList(WORKerAssigned:$WORKerAssigned){
  WORKerAssigned
  LeadName
  Age
  City
  ContactNumber
  Country
  Chapter
  District}
  }`

const columns=['LeadName','Age','WORKerAssigned','City','ContactNumber','Country','Chapter','District']  

const FindNShareReferralsList=()=>{
  console.log()
    const [userListData,setUserListData]=useState([])
    const { data,loading ,error}=useQuery(FIND_SHARE_WORK_LEADS,{
      variables:{WORKerAssigned:"Keerti"}
     })

    useEffect(()=>{
     try{
      console.log(data)
      if (
        data !== undefined && data.fetchWORKLeadList !== undefined
      ) {
        let newData=data.fetchWORKLeadList.map((v,i)=>{
            return (<TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>     
                        <TableCell>{v.LeadName}</TableCell>
                        <TableCell>{v.Age}</TableCell>
                        <TableCell>{v.WORKerAssigned}</TableCell>
                        <TableCell>{v.City}</TableCell>
                        <TableCell>{v.ContactNumber}</TableCell>
                        <TableCell>{v.Country}</TableCell>
                        <TableCell>{v.Chapter}</TableCell>
                        <TableCell>{v.District}</TableCell>                                                               
                    </TableRow>)
        }) 
        setUserListData({newData})        
      } }       
      catch(err){throw err}
            
    },[data])

    if(loading)return `Please wait loading`
    if(error)return `Error ${error}`
    return userListData.length!==0 && <RTable columns={columns} tRow={userListData.newData}/>
}
export default FindNShareReferralsList;

