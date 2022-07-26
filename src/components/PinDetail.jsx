import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';

export default function PinDetail({user}) {
  
  const [pins, setPins] = useState(null)
  const [pinDetails, setPinDetails] = useState(null)
  const [comment, setComment] = useState('')
  // const [ShowComment, setShowComment] = useState(false)
  const [addingComment, setAddingComment] = useState(false)
  const [showImage, setShowImage] = useState(false)


  const {pinId} = useParams()

  const addComment=()=>{
    if(comment !== ''){
      setAddingComment(true)

      client.patch(pinId).setIfMissing({comments:[]}).insert('after','comments[-1]',[{
        comment,
        _key:uuidv4(),
        postedBy:{
          _type:'postedBy',
          _ref:user._id,
        }
      }])
      .commit()
      .then(()=>{ 
        fetchPinDetails();
        setComment('');
        setAddingComment(false)
      })
    }
  }
  
  const fetchPinDetails =()=>{
    let query = pinDetailQuery(pinId);
    
    if(query){
      client.fetch(query)
      .then((data)=>{
        setPinDetails(data[0]);

        if(data[0]){
          query=pinDetailMorePinQuery(data[0]);
          
          client.fetch(query)
          .then((res)=>setPins(res))
        }
      })
    }
  }
  
  useEffect(()=>{
    fetchPinDetails();
  },[pinId,comment])

  useEffect(()=>{
  },[,])

  
  if(!pinDetails){
    return <Spinner type="Puff" message="Loading pin ....." />
  }

  return (
    <div className='flex xl:flex-row flex-col m-auto bg-white rounded-[32px] max-w-[1500px]'>
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img src={pinDetails?.image && urlFor(pinDetails.image).url()} alt="user-post" className='rounded-t-3xl rounded-b-lg cursor-zoom-in' onClick={()=>setShowImage(true)} />
      </div>
      {showImage && (
        <div className='fixed top-0 right-0 left-0 bottom-0 w-screen h-screen flex items-center justify-center z-[1000]'>
          <span id="bg" className='h-screen w-screen absolute bg-[rgba(0,0,0,0.89)]' onClick={()=>setShowImage(false)}></span>
          <img src={pinDetails?.image && urlFor(pinDetails.image).url()} alt="user-post" className='h-auto w-auto max-w-full max-h-full m-auto animate-viewImg' />
          <CgClose className='flex items-center text-[35px] justify-center bg-white p-1.5 rounded-full text-dark opacity-75 outline-none hover:shadow-md hover:opacity-100 absolute top-5 right-5 cursor-pointer' onClick={()=>setShowImage(false)} />
          <a href={`${pinDetails.image?.asset?.url}?dl=`} download onClick={(e)=>{e.stopPropagation();setShowImage(false)}} className="flex items-center justify-center absolute top-5 right-[70px] bg-white w-9 h-9 rounded-full text-dark text-xl opacity-75 outline-none hover:shadow-md hover:opacity-100" >
            <MdDownloadForOffline />
          </a>
        </div>
      )}
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
        <Link
            to={`/profile/${pinDetails.postedBy?._id}`}
            className="flex gap-2 items-center bg-white rounded-lg"
          >
              <img src={pinDetails.postedBy?.image} alt="user-profile" className='w-8 h-8 rounded-full object-cover' />        
              <p className="font-semibold capitalize">
                {pinDetails?.postedBy?.fullName}
              </p>
          </Link>
          <div className="flex items-center gap-2">
            <a href={`${pinDetails.image?.asset?.url}?dl=`} download onClick={(e)=>e.stopPropagation()} className="flex items-center justify-center bg-white w-9 h-9 rounded-full text-dark text-xl opacity-75 outline-none hover:shadow-md hover:opacity-100" >
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetails?.destination} target="_blank" rel="noreferrer" className='bg-white text-black flex items-center gap-2 font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
              <BsArrowRightCircleFill/>
              {pinDetails?.destination.length > 22 ? pinDetails?.destination.slice(0,22) : pinDetails?.destination.slice(0)} . . .
          </a>
        </div>
        <div>
          <h1 className='text-4xl font-bold break-words mt-3'>
            {pinDetails?.title}
          </h1>
          <p className='mt-3'>
            {pinDetails?.about}
          </p>
        </div>
          <h2 className="mt-5 mb-1 text-2xl">
            {pinDetails?.comments? `Comments (${pinDetails?.comments?.length})`:'No Comments'}
          </h2>
          <div className="max-h-370 overflow-y-auto p-5 flex gap-5 flex-col rounded-lg" style={{boxShadow:'0px 0px 30px #eee inset'}}>
            {pinDetails?.comments? pinDetails?.comments?.map((comment,index)=>(
              <div key={index} className="flex gap-2 items-center bg-white rounded-lg">
                <Link
                  to={`/profile/${pinDetails.postedBy?._id}`}
                >
                  <img src={comment.postedBy.image} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer' />
                </Link>
                <div className="flex flex-col">
                <Link
                  to={`/profile/${pinDetails.postedBy?._id}`}
                >
                  <p className='text-gray-700 mt-1 hover:underline'>{comment.postedBy?.fullName}</p>
                </Link>
                  <p className='font-bold border-l-2 border-red-300 px-2 ml-2'>{comment?.comment}</p>
                </div>
              </div>
            ))
          :
          (<div>No comments yet</div>)
          }
          </div>
          <div className="flex flex-row mt-6 gap-3 items-center w-full">
            <Link
              to={`/profile/${pinDetails.postedBy?._id}`}
              className="flex items-center bg-white rounded-lg"
            >
              <img src={user?.image} alt="user-profile" className='w-10 h-10 rounded-full object-cover' />        
            </Link>
              <input 
              type="text" 
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              className='outline-none text-base sm:text-lg font-bold border-2 scale-[0.99] transition-all ease-in-out focus:scale-100 border-gray-200 focus:border-gray-400 p-2 w-4/5 rounded-2xl'
              placeholder='Add Comment'
              />
              <button
              type='button'
              className={`text-white font-semibold p-2 rounded-full hover:opacity-100 ${ comment === '' ? 'bg-gray-400 cursor-[default]' : 'bg-red-500 opacity-80 cursor-pointer' } transition-all`}
              onClick={addComment}
              >
                {addingComment ? 'In Progress ....':'Comment'}
              </button>
          </div>
      </div>
    </div>
  )
}
