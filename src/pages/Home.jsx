import React, { useEffect, useRef, useState } from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Route,Routes,Link} from 'react-router-dom'

import logo from '../assets/logo.png'
import Pins from './Pins'
import {client} from '../client'
import { userQuery } from '../utils/data'
import { fetchUser } from '../utils/fetchUser'
import { Sidebar , UserProfile } from '../components'

export default function Home() {
  const [user, setUser] = useState(null)
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const scrollRef =useRef(null)
  const userInfo = fetchUser()


  useEffect(()=>{
    const query = userQuery(userInfo?.sub)

    client.fetch(query).then((data)=>{
      setUser(data[0])
    })
    },[])

    useEffect(() => {
      scrollRef.current.scrollTo(0,0)
    }, [])
    
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>

      <div className="flex md:hidden flex-row">
        <div className="flex justify-between items-center w-full p-2 flex-row shadow-md">
          <HiMenu className='cursor-pointer text-[35px]' onClick={()=>setToggleSidebar(true)}/>

          <Link to="/" id='logo' className='flex flex-row items-center gap-2 absolute left-16 top-4'>
            <svg className='w-[30px] fill-red-500' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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
            <p><span id='logo-touch' className='font-[800] text-xl text-black'>Touch</span><span id='logo-share' className='font-bold text-gray-900 text-[17px]'>Share</span></p>
          </Link>

          <Link to={`/profile/${user?._id}`}>
            <img src={user?.image} alt="" className='w-12 rounded-full' />
          </Link>
        </div>
        {toggleSidebar &&(
          <>
            <span id="bg" className='h-screen w-screen fixed bg-[rgba(0,0,0,0.5)] top-0 right-0 z-10' onClick={()=>setToggleSidebar(false)}></span>
            <div className="fixed w-[70%] bg-white h-screen overflow-y-auto shadow-md animate-slide-in z-10">
              <div className="flex absolute justify-end w-full items-center p-2">
                <AiFillCloseCircle className='text-[30px] cursor-pointer' onClick={()=>setToggleSidebar(false)}/>
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          </>
        )}
      </div>
      <div className="overflow-y-scroll h-screen pb-2 flex-1" ref={scrollRef}>
        <Routes>
          <Route path='/profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}
