import  { useEffect, useState } from "react";
import { useQuery } from "graphql-hooks";
import RTable from "../components/Table";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const USER_LISTING=`{fetchUserList{
    username
    id
    email
    phone
    name
    address{
      street
      geo{
        __typename
        lat
        lng
      }
      suite
      zipcode
    }
    website
  }
}
  `

const columns=['Id','Username','Name','Email','Phone','Street','Lat','Lng','Suite','Zipcode','Website']  

const UserListing=()=>{
    const [userListData,setUserListData]=useState([])
    const {data,loading,error}=useQuery(USER_LISTING)

    useEffect(()=>{        
            if(data!==undefined && data.fetchUserList.length!==0){
                let newData=data.fetchUserList.map((v,i)=>{
                    return (<TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>     
                                <TableCell>{v.id}</TableCell>
                                <TableCell>{v.username}</TableCell>
                                <TableCell>{v.name}</TableCell>
                                <TableCell>{v.email}</TableCell>
                                <TableCell>{v.phone}</TableCell>
                                <TableCell>{v.address.street}</TableCell>
                                <TableCell>{v.address.geo.lat}</TableCell>
                                <TableCell>{v.address.geo.lng}</TableCell>
                                <TableCell>{v.address.suite}</TableCell>
                                <TableCell>{v.address.zipcode}</TableCell>
                                <TableCell>{v.website}</TableCell>
                            </TableRow>)
                }) 
                setUserListData({newData})  
            }
    },[data])

    if(loading)return `Please wait loading`
    if(error)return `Error ${error}`
    return userListData.length!==0 && <RTable columns={columns} tRow={userListData.newData}/>
}
export default UserListing;

