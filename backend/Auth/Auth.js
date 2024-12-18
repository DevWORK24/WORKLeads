const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{      
    const authHearderVal=req.headers.authorization   
    if(!authHearderVal){       
        req.checkIsAuth=false
        return next() 
    }
    const token= authHearderVal.split(' ')[1]
    if(!token){
        req.checkIsAuth=false
        return next()        
    }    
    let userTokenValid;
    try{
        userTokenValid=jwt.verify(token,process.env.JWTSECRET)
    }catch(err){
        req.checkIsAuth=false
        return next()       
    }     
    if(!userTokenValid){
        req.checkIsAuth=false
        return next()
    }        
        req.checkIsAuth=true
        req.userId=userTokenValid.uid
        req.EmailAddress=userTokenValid.EmailAddress
        return next()       
}