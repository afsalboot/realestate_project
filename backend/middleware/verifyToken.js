const jwt = require('jsonwebtoken');

require('dotenv').config()



const verifyToken = (req,res,next) => {

    const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  console.log("Authorization header:", authHeader);
  console.log("token value", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

    
    if (token) {

        jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
            console.log("Data value:",data);
           
            if(err){
                console.log("JWT verify error:", err.message);
                return res.status(401).json('invalid token')
            } 
                console.log("Decoded data:", data);
                

            if(req.params.id == data.userId){
                next()
            }else{
                return res.status(401).json('UserID and token mismatched')
            }

        })

    } else {
        
        return res.status(401).json('not authorized')
    }
}

module.exports = verifyToken