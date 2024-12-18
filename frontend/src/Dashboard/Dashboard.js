import  Cards  from '../components/Cards'
import { useQuery } from 'graphql-hooks'
import React,{useEffect, useState} from 'react'

const DASHBOARD_DATA=` 
query dashboardScreen($pageSize:Int,$pageNo:Int){
    dashboardScreen(pageSize:$pageSize,pageNo:$pageNo){
      DasboardRecords{
      albumId
      thumbnailUrl
      title
      url
      id
    }
      totalCount
    }     
  }`

const Dashboard=(props)=>{
    const [dashboardData,setDashboardData]=useState([])    

    const {data,loading,error}=useQuery(DASHBOARD_DATA,{
        variables:{
            pageSize:parseInt(process.env.REACT_APP_PAGE_SIZE),
            pageNo:props.currenPgNum || 1
        }
    })

    useEffect(()=>{
        if(data!==undefined && data.dashboardScreen.length!==0){
          setDashboardData(data.dashboardScreen.DasboardRecords)           
          props.handleTotalCount(data.dashboardScreen.totalCount)
        }             
    },[data,dashboardData,props])
    
    if(loading) return 'Please  wait   loading  ....  '
    if(error) return `Errors ${error}`
    return (dashboardData.length!==0 && <ul style={{listStyleType:"none"}}>{dashboardData.map((v,i)=><li key={i}><Cards  title={v.title} imgURL={v.url}/></li>)}</ul>)
}
export default  Dashboard;
