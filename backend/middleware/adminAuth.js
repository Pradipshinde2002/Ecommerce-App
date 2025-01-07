import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        // Get token from the Authorization header
        const authHeader = req.headers.authorization || req.headers.token; // Use 'token' for fallback if needed
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Authorization token is missing. Please log in again." });
        }

        // Extract the token (if using "Bearer <token>" format)
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token payload matches admin credentials
        if (decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: "Not authorized to access this resource." });
        }

        // Proceed to the next middleware or route
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Token verification failed. " + error.message });
    }
};

export default adminAuth;








// import jwt from 'jsonwebtoken'

// const adminAuth=async(req,res,next)=>{

    
// try{
//     const {token}=req.headers

//     if(!token){
//         return res.json({success:false,message:"Not Authorizes login again"})

//     }
//     const token_decode=jwt.verify(token,process.env.JWT_SECRET)
//     if(token_decode != process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
//         return res.json({success:false,message:"Not Authorized login again"})
//     }
//     next()

// }catch(error){
//     console.log(error)
//     res.json({success:false,message:error.message})

// }
// }

// export default adminAuth
