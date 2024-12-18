let { makeExecutableSchema }=require('@graphql-tools/schema')
const axios=require('axios') 
const jsonwebtoken=require('jsonwebtoken')
var FindNShareReferralsSchema = require('./FindNShareReferralsSchema');

const typeDefs=`
scalar Date
scalar Upload


type FindReferralList{
    id: Int
    LeadName: String
    Gender: String
    City: String
    District: String
    WORKerAssigned: String
    ContactNumber: String
    Country: String
    Chapter: String
    Age: Int
    CreatedDate: Date
    LastModified: Date
}

input LeadData{
    LeadName: String
    Gender: String
    City: String
    District: String
    WORKerAssigned: String
    ContactNumber: String
    Country: String
    Chapter: String
    Age: Int
}

input WORKerLeadSheetInput{
  WORKerLeadSheet: Upload
}

type Query {
fetchWORKLeadList(WORKerAssigned:String):[FindReferralList]
}

type Mutation{
 
 CreateOrShareReferralsUser(input:[LeadData]): [FindReferralList] 
}
`

const resolvers={
  Query:{      
    fetchWORKLeadList:async(root,{WORKerAssigned})=>{
     // return new Promise(async(resolve,reject)=>{
          try{
            console.log("WORKerAssigned",WORKerAssigned)
            let FindReferralsList = await FindNShareReferralsSchema.find( { WORKerAssigned } );
            console.log("FindReferralsList",FindReferralsList)
            if (!FindReferralsList) {
              throw new  Error('Error - No FindNShareReferralss Exist');
            }
            return FindReferralsList;
          }
          catch(err){console.log(err)}    
    }
  },
  Mutation:{
      CreateOrShareReferralsUser:async(root, { input })=> {
        console.log('createUser', input)
          input.map(async(val, ky) => {
              console.log("val",val, ky);
              const FindNShareReferralsModel = new FindNShareReferralsSchema(val);
              const newFindNShareReferrals = await FindNShareReferralsModel.save();
              console.log(newFindNShareReferrals);
              if (!newFindNShareReferrals) {
                throw new Error('Error- No FindNShareReferrals Exist');
              }
              return newFindNShareReferrals;
            })
          }
    }
  }

let FindNShareReferralsGraphqlSchema=makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports=FindNShareReferralsGraphqlSchema

/***
 * 
 mutation CreateOrShareReferralsUser($CreateOrShareReferralsIp:[LeadData]){
  CreateOrShareReferralsUser(input:$CreateOrShareReferralsIp){
  WORKerAssigned}
  }
  {
  "CreateOrShareReferralsIp": [
    {
      "LeadName": "POR",
      "Gender": "Male",
      "City": "Belgaum",
      "District": "Belgaum",
      "WORKerAssigned": "Keerti",
      "ContactNumber": "8876543212",
      "Country": "India",
      "Chapter": "Belgaum",
      "Age": 70
    },
    {
      "LeadName": "WWE",
      "Gender": "Male",
      "City": "Belgaum",
      "District": "Belgaum",
      "WORKerAssigned": "Hafsah",
      "ContactNumber": "9896543212",
      "Country": "India",
      "Chapter": "Belgaum",
      "Age": 75
    }
  ]
}
 
 
mutation fetchWORKLeadList($WORKerAssigned:String){
  fetchWORKLeadList(WORKerAssigned:$WORKerAssigned){
  WORKerAssigned
  LeadName
  Age
  City
  ContactNumber
  Country
  Chapter
  District}
  }

{ fetchWORKLeadList($WORKerAssigned:String){
  fetchWORKLeadList(WORKerAssigned:$WORKerAssigned){
  WORKerAssigned
  LeadName
  Age
  City
  ContactNumber
  Country
  Chapter
  District}
  }
}
{
  "WORKerAssigned": "Keerti"
}

{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzcwZTczZWNkMThmMTg4MTJkNzQwOTkiLCJpYXQiOjE2Njg1MzYzNjQsImV4cCI6MTY2ODUzOTk2NH0.mGUHmreX46ebTGjSTnq0tE8BuSrWaz3sxBSozFM1ilI"}



 */