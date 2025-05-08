const jwt = require('jsonwebtoken')


 const shouldBeLoggedIn = async (req,res) => {

    console.log(req.params.id);

    return res.status(200).json({message:"You are Authenticated"})
}

 const shouldBeAdmin = async (req,res) => {
    

    // if(!token){
    //     return res.status(401).json({message:"Not Authenticated!"})
    // }

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload)=>{
        if(err){
            return res.status(403).json({message:"Token is not Valid!"})
        }
        if(!payload.isAdmin){
            return res.status(403).json({message:"Not Authorized!"})
        }
    })

    return res.status(200).json({message:"You are Authenticated"})
}

module.exports = { shouldBeLoggedIn,shouldBeAdmin }