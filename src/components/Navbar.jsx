import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {IoMdAdd,IoMdSearch} from 'react-icons/io'

export default function Navbar({searchTerm,setSearchTerm,user}) {
  const navigate = useNavigate()

  if(!user){
    return null
  }
   
  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='bg-gray-100 flex w-full justify-start items-center px-2 rounded-md border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch className='text-[21px] mr-2 cursor-pointer'/>
        <input type="text" 
        onFocus={()=>navigate('/search')}
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        placeholder="Search"
        className='p-2 w-full bg-white outline-none'
        />
      </div>
      <div className="flex gap-3">
        <Link
        to={`/profile/${user?._id}`}
        className="hidden md:block"
        >
          <img src={user.image} alt="" className='rounded-lg h-12 w-14' />
        </Link>
        <Link
        to={`create-pin`}
        className="h-12 w-12 md:w-14 bg-black text-white rounded-lg flex justify-center items-center text-2xl"
        >
          <IoMdAdd />
        </Link>
      </div>        
    </div>
  )
}
