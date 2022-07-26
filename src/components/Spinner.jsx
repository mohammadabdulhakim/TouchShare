import React from 'react'
import {Grid, Puff, Watch} from 'react-loader-spinner'

export default function Spinner({message,type}) {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      {type === 'Watch' ?
      (
        <Watch
          color="#00BFFF"
          height={50}
          width={200}
          className="m-5"
          ariaLabel='loading'
        />
      )
      :type === 'Grid' ?
      (
        <Grid
          color="#00BFFF"
          height={50}
          width={200}
          className="m-5"
          ariaLabel='loading'
        />
        ):type === "Puff" ?
        (
          <Puff
            color="#00BFFF"
            height={50}
            width={200}
            className="m-5"
            ariaLabel='loading'
          />
      )
      :
      ''
      }
      <p className='text-lg text-center px-2 mt-2' >{message}</p>
    </div>
  )
}
