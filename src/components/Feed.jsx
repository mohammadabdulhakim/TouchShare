import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

import {client} from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

export default function Feed() {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)

  const {categoryId} = useParams()
  useEffect(() => {
    setLoading(true)

    if(categoryId){
      const query = searchQuery(categoryId)

      client.fetch(query).then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }else{
      client.fetch(feedQuery).then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }

  }, [categoryId])
  

  if(loading) return <Spinner type="Grid" message={`We are adding new ${categoryId ? categoryId:''} ideas to your feed !`} />
  if(!pins?.length) return <h2>No Pins in ({categoryId}) yet. </h2>
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}
