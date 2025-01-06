import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT '} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur possimus exercitationem minima vel laudantium temporibus natus reprehenderit illum quod sed eius nemo, dolores quasi autem voluptatum, rem beatae sapiente recusandae.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore eum id sed doloremque temporibus magni, rerum velit laboriosam nam necessitatibus, voluptas veniam aliquid, ea consequuntur possimus accusamus? Tenetur, sit facere.</p>

        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim similique ipsam fuga aut! Enim doloremque corporis dignissimos? Repellendus et deserunt esse, non dicta voluptas voluptate itaque ut, saepe odit consequatur?</p>

        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US'} />


      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus commodi quas error pariatur dolores odio doloremque, sequi velit eaque a nesciunt explicabo minus neque tempora tempore minima laboriosam ipsa veniam.</p>

        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas consequuntur officiis minus quam explicabo repudiandae assumenda nulla, quasi delectus quibusdam veniam inventore voluptatibus? Porro at, necessitatibus laudantium tenetur sequi quisquam.</p>

        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur quibusdam aliquam reiciendis quod esse labore? Aspernatur officiis sint esse voluptates maxime. Animi quos reprehenderit perspiciatis? Quod omnis error quasi dicta.</p>

        </div>
      </div>


      <NewsLetterBox />
    </div>
  )
}

export default About