import Image from 'next/image'
import React from 'react'

const BigCompannies = () => {
  return (
    <div className='bg-[#FAFAFA] mt-10 py-11 wrapper'>
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-[40px] font-bold text-[#252B42]">Industry Giants Are Here</h1>
            <p className="text-[#737373] text-[14px] mt-3">Problems Trying to Resolve the Conflict between </p>
            <p className="text-[#737373] text-[14px] mt-3">The two Major Realms of Classical Physics: Newtonian Mechanics </p>
        </div>
        <div className='mt-12 flex justify-center items-center'>
            <Image src={"/companies.png"} alt='companies' width={1054} height={175} />
        </div> 
    </div>
  )
}

export default BigCompannies