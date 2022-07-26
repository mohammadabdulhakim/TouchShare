import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'

import logo from '../assets/logo.png'
import {categories} from '../utils/data'


const normalLink = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize"
const activeLink = "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize"

export default function Sidebar({user,closeToggle}) {
  const handleCloseSidebar = ()=>{
    if(closeToggle){
      closeToggle(false)
    }
  }
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-[250px] hide-scrollbar'>
      <div className="flex flex-col">

        <Link to="/" id='logo' onClick={handleCloseSidebar} className='flex flex-row items-center gap-2 px-5 my-6 pt-1'>
            <svg className='w-[35px] fill-red-500' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 487 487">
              <g>
                <g>
                  <path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z
                    M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9
                    v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z
                    M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z
                    M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"/>
                </g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
              <g>
              </g>
            </svg>    
            <p><span id='logo-touch' className='font-[800] text-[25px] text-black'>Touch</span><span id='logo-share' className='font-bold text-gray-900 text-[19px]'>Share</span></p>
        </Link>

        <div className="flex flex-col gap-5">
          <NavLink
          to="/"
          onClick={handleCloseSidebar}
          className={({isActive})=>isActive? activeLink:normalLink}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-4 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0,categories.length - 1).map((category)=>(
            <NavLink
            key={category.name}
            to={`/category/${category.name}`}
            onClick={handleCloseSidebar}
            className={({isActive})=>isActive? activeLink:normalLink}
            >
              <img src={category.image} alt="category" className='w-8 h-8 rounded-full shadow-sm' />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link to={`/profile/${user._id}`} onClick={handleCloseSidebar} className="flex items-center p-2 gap-2 mb-3 my-5 shadow-lg bg-white rounded-lg mx-3">
          <img src={user.image} alt="user-profile" className='w-10 h-10 rounded-full' />
          <p>{user.firstName} {user.secondName}</p>
        </Link>
      )}
    </div>
  )
}
