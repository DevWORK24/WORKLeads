let { makeExecutableSchema }=require('@graphql-tools/schema')
const axios=require('axios')

const typeDefs=`
type DasboardRecords{
    albumId: Int
    id: Int
    title: String
    url: String
    thumbnailUrl: String
}

type DasboardDetails{
    DasboardRecords:[DasboardRecords]
    totalCount:Int
}

type Query{
    dashboardScreen(pageSize:Int,pageNo:Int):DasboardDetails
    dashboardScreen1(pageSize:Int,pageNo:Int):[DasboardRecords]
}
`
const resolvers={
    Query:{
        dashboardScreen:async(root,{pageSize,pageNo},req,info)=>{           
            return new Promise(async(resolve,reject)=>{                
                try{   
                    if(!req.checkIsAuth)throw new Error('Authorization header required')                    
                    const DashData= await axios.get(`${process.env.THIRD_PARTY_URL}photos`)                    
                    if(!DashData)reject(DashData)                                   
                    resolve({DasboardRecords:DashData.data.slice(((pageSize*pageNo)-pageSize),(pageSize*pageNo)),totalCount:DashData.data.length})
                }
                catch(err){reject(err)}
            })
            
        }
    }  
}

let DashboardGraphqlSchema=makeExecutableSchema({typeDefs,resolvers})

module.exports = DashboardGraphqlSchema;

/*******
 * Dashbord screen
 * 
 *query dashboardScreen($pageSize:Int,$pageNo:Int){
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
    
}
{"pageSize":10,
"pageNo":1}
 * 
 * {"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzcwZTczZWNkMThmMTg4MTJkNzQwOTkiLCJpYXQiOjE2Njg1NjA1MTIsImV4cCI6MTY2ODU2NDExMn0.bu6qO6WHj4yfbIIFfpO5jsL2MrCF-FyXIFg2drvacCA"}
 */