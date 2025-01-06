
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const allowedOrigins = ['https://ecommerce-admin-five-chi.vercel.app'];

//app config
const app = express()
const port = process.env.PORT || 4000

// added for when got error of axios error


connectDB()

connectCloudinary()

//middlewares
app.use(express.json())
// app.use(cors())   //added corsOptions 




//added 
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If cookies or auth tokens are required
  })
);





//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port,()=>console.log('server started on PORT :'+ port))
