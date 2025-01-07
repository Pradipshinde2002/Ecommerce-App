import jwt from 'jsonwebtoken'

const adminAuth=async(req,res,next)=>{

    if (req.method === 'OPTIONS') {
        return next(); // Skip authentication for preflight requests
    }
try{
    const {token}=req.headers

    if(!token){
        return res.json({success:false,message:"Not Authorizes login again"})

    }
    const token_decode=jwt.verify(token,process.env.JWT_SECRET)
    if(token_decode != process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        return res.json({success:false,message:"Not Authorized login again"})
    }
    next()

}catch(error){
    console.log(error)
    res.json({success:false,message:error.message})

}
}

export default adminAuth
