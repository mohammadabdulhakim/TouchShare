import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { CgClose } from 'react-icons/cg';
import { MdDownloadForOffline } from 'react-icons/md';
// import { GoogleLogout } from 'react-google-login';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client,urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

export default function UserProfile() {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const [showImage, setShowImage] = useState(false)

  
  const navigate = useNavigate();
  const { userId } = useParams();

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  
  useEffect(()=>{
    const query =userQuery(userId)
    
    client.fetch(query)
    .then((data)=>{
      setUser(data[0])
    })
  },[userId])

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const handleLogout=()=>{
    localStorage.clear();
    navigate('/login');
  }

  if(!user){
    return <Spinner message="Loading profile ..." type="Puff" />
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-[100px] h-[100px] border-2 -mt-10 shadow-xl object-cover"
              src={user?.image}
              alt="user-pic"
              onClick={()=>setShowImage(true)}
            />
            {showImage && (
              <div className='fixed top-0 right-0 left-0 bottom-0 w-screen h-screen flex items-center justify-center z-[1000]'>
                <span id="bg" className='h-screen w-screen absolute bg-[rgba(0,0,0,0.89)]' onClick={()=>setShowImage(false)}></span>
                <img src={user?.image} alt="user-post" className='h-auto w-auto max-w-full max-h-full m-auto animate-viewImg' />
                <CgClose className='flex items-center text-[35px] justify-center bg-white p-1.5 rounded-full text-dark opacity-75 outline-none hover:shadow-md hover:opacity-100 absolute top-5 right-5 cursor-pointer' onClick={()=>setShowImage(false)} />
              </div>
            )}
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.fullName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === userInfo?.sub && (
              <button
              type="button"
              className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={handleLogout}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>

        { pins && (<div className="px-2">
          <MasonryLayout pins={pins} />
        </div>)}

        {pins?.length === 0 && (
        <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
          No Pins Found!
        </div>
        )}
      </div>

    </div>
  )
}
