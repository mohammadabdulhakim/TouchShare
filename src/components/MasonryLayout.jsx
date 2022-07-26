import React from 'react'
import Masonry from 'react-masonry-css'
import {randomArrayElements} from 'agere'

import Pin from './Pin'

const breakPointObj ={
  default:4,
  3000:5,
  2000:4,
  1200:3,
  1000:2,
  500:1,
}


export default function MasonryLayout({pins}) {

  randomArrayElements.everyReload(pins)

  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakPointObj}>
      {pins.map((pin)=> <Pin key={pin._id} pin={pin} className="w-max" />)}
    </Masonry>
  )
}
