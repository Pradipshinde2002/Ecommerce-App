import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const allowedOrigins = ['https://ecommerce-admin-five-chi.vercel.app'];

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Database and cloud services connection
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Preflight handling (explicit handling is not needed if `cors` middleware is correctly set)
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins.join(', '));
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200); // Respond with 200 OK for preflight requests
});

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Start the server
app.listen(port, () => console.log('Server started on PORT: ' + port));










// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'
// import productRouter from './routes/productRoute.js'
// import cartRouter from './routes/cartRoute.js'
// import orderRouter from './routes/orderRoute.js'

// const allowedOrigins = ['https://ecommerce-admin-five-chi.vercel.app'];

// //app config
// const app = express()
// const port = process.env.PORT || 4000

// // added for when got error of axios error


// connectDB()

// connectCloudinary()

// //middlewares
// app.use(express.json())
// // app.use(cors())   //added corsOptions 




// //added 
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: 'GET,POST,PUT,DELETE,OPTIONS',
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true, // If cookies or auth tokens are required
//   })
// );

// // Handle preflight requests
// app.options('*', cors()); 




// //api endpoints
// app.use('/api/user',userRouter)
// app.use('/api/product',productRouter)
// app.use('/api/cart',cartRouter)
// app.use('/api/order',orderRouter)


// app.get('/',(req,res)=>{
//     res.send('API WORKING')
// })

// app.listen(port,()=>console.log('server started on PORT :'+ port))
