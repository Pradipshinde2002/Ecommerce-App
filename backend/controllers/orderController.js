import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
// import Razorpay from 'razorpay'   // razorpay not working


//global variables
const currency='inr'
const deliveryCharges=10

//gateway initialize
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
 
//razorpay not working
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,  // Replace with your Razorpay key_id
//     key_secret: process.env.RAZORPAY_KEY_SECRET  // Replace with your Razorpay key_secret
// });

//------------------------

// const razorpayInstance=new razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET,
// })

//placing orders using COD method
const placeOrder=async(req,res)=>{
    try {

        const {userId,items,amount,address}=req.body

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()


        }

        const newOrder=new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})



    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}


//placing orders using stripe method
const placeOrderStripe=async(req,res)=>{

    try {
        const {userId,items,amount,address}=req.body
        const {origin}=req.headers

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }

        const newOrder=new orderModel(orderData)
        await newOrder.save()


        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity:item.quantity
        }))
            line_items.push({
                price_data:{
                    currency:currency,
                    product_data:{
                        name:'Delivery Charges'
                    },
                    unit_amount:deliveryCharges * 100
                },
                quantity:1
            })

            const session =await stripe.checkout.sessions.create({
                success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
                line_items,
                mode:'payment',

            })

            res.json({success:true,session_url:session.url})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

//VERIFY STRIPE
const verifyStripe=async(req,res)=>{
    const {orderId,success,userId}=req.body

    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}


//placing orders using razorpay method

// const placeOrderRazorpay = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;

//         // Ensure currency is defined
//         const currency = "INR"; // Define currency explicitly or use an environment variable

//         // Razorpay order creation options
//         const options = {
//             amount: amount * 100, // Razorpay expects the amount in paise (smallest currency unit)
//             currency: currency.toUpperCase(),
//             receipt: `order_${Date.now()}`, // Unique receipt ID
//         };

//         console.log(options)
//         // Create Razorpay order
//         const razorpayOrder = await new Promise((resolve, reject) => {
//             razorpayInstance.orders.create(options, (error, order) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(order);
//                 }
//             });
//         });

//         // Prepare order data to save in the database
//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod: "Razorpay",
//             payment: false,
//             date: Date.now(),
//             razorpayOrderId: razorpayOrder.id, // Save the Razorpay order ID
//         };

//         // Save the order to the database
//         const newOrder = new orderModel(orderData);
//         await newOrder.save();

//         // Respond with Razorpay order details
//         res.json({ success: true, order: razorpayOrder });
//     } catch (error) {
//         console.error("Error in placeOrderRazorpay:", error);
//         res.status(500).json({ success: false, message: "Failed to create order. Please try again later." });
//     }
// };


// const placeOrderRazorpay=async(req,res)=>{

//     try {
//         const {userId,items,amount,address}=req.body

//         const orderData={
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod:"Razorpay",
//             payment:false,
//             date:Date.now()


//         }

//         const newOrder=new orderModel(orderData)
//         await newOrder.save()


//         const options={
//             amount:amount*100,
//             currency:currency.toUpperCase(),
//             receipt:newOrder._id.toString()
//         }

//          razorpayInstance.orders.create(options,(error,order)=>{
//             if(error){
//                 console.log(error);
//                 return res.json({success:false,message:error})
                
//             }

//             res.json({success:true,order})
            
//         })
        
//     } catch (error) {

//         console.log(error)
//         res.json({success:false,message:error.message})
        
//     }

// }

//all orders data for admin panel
const allOrders=async(req,res)=>{

    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

//user order data for frontend
const userOrders=async(req,res)=>{
    try {
        const {userId}=req.body
        const orders=await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
    
}

//update order status from Admin Panel
const updateStatus=async(req,res)=>{

    try {
        const {orderId,status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}


export {verifyStripe,placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus}   //,placeOrderRazorpay