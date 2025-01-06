import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { use } from 'react'
import { assets } from '../assets/assets'
import Relatedproducts from '../components/Relatedproducts'

const Product = () => {
  const {productId}=useParams()
  const {products,currency,addToCart}=useContext(ShopContext)
  const [productdata,setProductData]=useState(false)
  const [image,setImage]=useState('')
  const [size,setSize]=useState('')

  const fetchProductdata=async()=>{
    products.map((item)=>{
      if(item._id===productId){
        setProductData(item)
        setImage(item.image[0])
        
        return null
      }
    })

  }
  

  useEffect(()=>{
      fetchProductdata()
  },[productId,products])



  return productdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-500'>
      {/*--------------- Product Data----------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* ------------Product Images----------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productdata.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                ))
              }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />  

          </div>

        </div>

        {/* ---------Product Info -------------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productdata.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500':''}`} key={index}>{item}</button>
                ))
              }

            </div>

          </div>
          <button onClick={()=>addToCart(productdata._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>

          </div>

        </div>

      </div>

      {/* -----------Description and review section*/}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Review (122)</p>

        </div>
        <div className='flex flex-col gap-4 border px-6 text-sm text-gray-500'>
          <p>E-commerce, or electronic commerce, is the buying and selling of goods and services over the internet. It can involve transactions between businesses, consumers, or both.</p>
          <p>At its core, electronic commerce or e-commerce is simply the buying and selling of goods and services using the internet, when shopping online.</p>
        </div>

      </div>

      {/* ---------Display related products------------ */}

      <Relatedproducts category={productdata.category} subCategory={productdata.subCategory} />

    </div>
  ):<div className='opacity-0'></div>
}

export default Product