import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsArrowRightCircleFill} from 'react-icons/bs'
import {format} from "timeago.js";

import { fetchUser } from '../utils/fetchUser'
import { client, urlFor } from '../client'
import PinDetail from './PinDetail'


export default function Pin({pin:{_createdAt,image,_id,save,destination,postedBy}}) {
    const [postHovered, setPostHovered] = useState(false)
    const [savingPost, setSavingPost] = useState(false)

    const userInfo = fetchUser()
    const alreadySaved = !!(save?.filter((item)=> item?.postedBy?._id === userInfo?.sub))?.length
    const navigate =useNavigate()

    
    const savePin = (id) =>{
        if(!alreadySaved){
            setSavingPost(true)
            client.patch(id).setIfMissing({save:[]}).insert('after','save[-1]',[{
                _key:v4(),
                userId:userInfo?.sub,
                postedBy:{
                    _type:'postedBy',
                    _ref:userInfo?.sub
                }
            }]).commit().then(()=>{
                window.location.reload()
                setSavingPost(false)
            }
            )
        }
    }

    const deletePin = (id) =>{
        client
        .delete(id)
        .then(() => {
            window.location.reload()
        })
    }


    return (
      <div className='m-2.5 mb-3.5'>
          <div
          className='relative cursor-zoom-in hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
          onMouseEnter={()=> setPostHovered(true)}
          onMouseLeave={()=> setPostHovered(false)}
          onClick={()=>navigate(`/pin-details/${_id}`)}
          >
              <img src={urlFor(image)?.width(250).url()} alt="user-post" className='rounded-lg w-full' />
              {postHovered && (
                  <div className="absolute top-0 flex w-full h-full flex-col pl-1 pr-2 justify-between pt-2 pb-2 z-50" style={{height:'100%'}}>
                      <div className="flex items-center justify-between relative">
                          <div className="flex gap-2">
                              <a href={`${image?.asset?.url}?dl=`} download onClick={(e)=>e.stopPropagation()} className="flex items-center justify-center bg-white w-9 h-9 rounded-full text-dark text-xl opacity-75 outline-none hover:shadow-md hover:opacity-100" >
                                  <MdDownloadForOffline />
                              </a>
                          </div>
                          {alreadySaved? 
                          (
                              <button 
                              type='button' 
                              className='bg-red-600 cursor-[default] opacity-100 hover:shadow-md font-bold text-white px-2 py-1 text-base rounded-3xl outline-none'
                              onClick={(e)=>{
                                  e.stopPropagation()
                                  savePin(_id)
                              }}
                              >
                                  {save?.length === 1 ? 'Only you saved it' :  `${save?.length} People saved it`}
                              </button>
                          ):
                          (
                              <button 
                              type='button' 
                              className='bg-red-500 opacity-70 hover:opacity-100 hover:shadow-md font-bold text-white px-5 py-1 text-base rounded-3xl outline-none'
                              onClick={(e)=>{
                                  e.stopPropagation()
                                  savePin(_id)
                              }}
                              >
                                  { savingPost? 'Saving' : 'Save'}
                              </button>
                          )
                          }                       
                      </div>
                      <div className="flex justify-between items-center gap-2 w-full">
                          {destination && (
                              <a href={destination} target="_blank" rel="noreferrer" className='bg-white text-black flex items-center gap-2 font-bold p-2 pl-4 pr-4 md:text-sm rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                                  <BsArrowRightCircleFill/>
                                  {destination.length > 10 ? destination.slice(0,10) : destination.slice(0)} . . .
                              </a>
                          )}
                          {postedBy?._id === userInfo?.sub && (
                              <button 
                                  type='button' 
                                  className='bg-white p-2 opacity-70 hover:opacity-100 hover:shadow-md font-bold text-dark text-base rounded-3xl outline-none'
                                  onClick={(e)=>{
                                      e.stopPropagation()
                                      deletePin(_id)
                                  }}
                              >
                                  <AiTwotoneDelete />
                              </button>
                          )}
                      </div>
                  </div>
              )}
          </div>
          <Link
            to={`/profile/${postedBy?._id}`}
            className="flex gap-2 mt-2 items-center relative"
          >
              <img src={postedBy?.image} alt="user-profile" className='w-8 h-8 rounded-full object-cover' />        
              <p className="font-semibold capitalize">
                {postedBy?.firstName}
              </p>
              <span className='absolute right-5 text-gray-600'>{format(_createdAt)}</span>
          </Link>
      </div>
    )
}
