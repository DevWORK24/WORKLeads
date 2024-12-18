const  Express =require( 'express')
const bodyParser=require('body-parser')
const cors =require( 'cors')
const Mongoose = require('mongoose');
const { graphqlHTTP }=require('express-graphql')
const path=require('path')
const multer = require('multer');
const { mergeSchemas }=require('@graphql-tools/schema')
//const { graphqlUploadExpress } = require('graphql-upload');
const Users=require('./Users/UserGraphqlSchema')
const FindNShareReferrals=require('./FindNShareReferrals/FindNShareReferralsGraphqlSchema')
const Dashboard=require('./Dashboard/DashboardGraphqlSchema')
const isAuthCheck=require('./Auth/Auth')

const app=Express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('port',process.env.GRAPHQL_PORT)
app.use(cors('*'))

//***********for production only***********
const runFE=Express();
runFE.use(Express.static(path.join(__dirname,'../frontend/build')))
runFE.get('/*',function(req,res){
    res.sendFile(path.join(__dirname,'/../frontend/build','index.html'))
})
runFE.listen(process.env.FRONTEND_PORT)
//***********for production only***********


async function mongoCall() {
    try { //mongodb://127.0.0.1:27017/workLeads 
      console.log("DB env",process.env.DB_HOST + process.env.DB_NAME)  
      await Mongoose.connect('mongodb://127.0.0.1:27017/workLeads')
        .then((response) => console.log('Connection Successful', response))
        .catch((err) => {
                            console.error('Mongo DB Connection Error', err)
                            process.exit(0);
                        });
            
    } catch (err) {
      throw err;
    }
  }
  mongoCall();

//****authentication middleware */
app.use(isAuthCheck)
//****authentication middleware */

 //******graphql Errors******/
 const customFormatErrorFn=(error)=>({
    message:error.message,
    location:error.location,
    stack:error.stack?error.stack.split('\n'):[],
    path:error.path
})
//******graphql Errors******/

//******Merge schemas******/
const Schema=mergeSchemas({
    schemas:[
        Users,
        Dashboard,
        FindNShareReferrals
    ]
  })
//******Merge schemas******/

//******graphql connect******/
app.use(
    '/graphql',
    //graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),                        
    graphqlHTTP({
            schema:Schema,
            rootValue:global,            
            graphiql: true,
            context: ({ req }) => ({
                user: req.user
              }),
            graphiql:{headerEditorEnabled:process.env.IGRAPHQL,shouldPersistHeaders:process.env.IGRAPHQL,headers:process.env.IGRAPHQL},                                                                                               
            customFormatErrorFn:customFormatErrorFn
        })                
)
//******graphql connect******/

// Server listens @ port
app.listen(app.get('port'),()=>console.log("Dev server listening @",app.get('port')))

