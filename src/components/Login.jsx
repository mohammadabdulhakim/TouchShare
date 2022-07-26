import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import jwt_decode from "jwt-decode"
// import { GoogleLogin } from '@react-oauth/google';
import {client} from '../client'

export default function Login() {

  const navigate = useNavigate()
  const handleCallbackResponse = (response)=>{
    var userObject = jwt_decode(response.credential)
    localStorage.setItem('user',JSON.stringify(userObject))
    const {email,sub,picture,given_name,family_name}=userObject
    const doc={
      _id:sub,
      _type:'user',
      userName:email,
      image:picture,
      email:email,
      firstName:given_name,
      secondName:family_name,
      fullName:`${given_name} ${family_name}`,
    }
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
      window.location.reload()
    });
  }
  

  React.useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInButton"),{theme:"outline",size:"large"}
    )
  },[])

  return (
    <div className='flex items-center justify-start flex-col h-screen'>
      <div className="relative w-full h-full">
        <video src={require("../assets/share.mp4")} className="w-full h-full object-cover" autoPlay loop muted />

        <div className="flex absolute items-center justify-center flex-col top-0 right-0 left-0 bottom-0 bg-blackOverlay ">
        <div id='logo' className='flex flex-row items-center gap-2 px-5 my-6 pt-1'>
            <svg className='w-[35px] fill-[#eee]' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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
            <p><span id='logo-touch' className='font-[800] text-[25px] text-white'>Touch</span><span id='logo-share' className='font-bold text-gray-300 text-[19px]'>Share</span></p>
        </div>

          <div className="shadow-2xl">
            {/* <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps)=>(
                <button type='button' className="bg-mainColor flex items-center justify-center p-3 rounded-lg outline-none cursor-pointer" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <FcGoogle className='mr-4'/> Sign in with Google
                </button>
            )}
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            /> */}
            <button id="signInButton" type='button' className="bg-mainColor flex items-center justify-center p-3 rounded-lg outline-none cursor-pointer" >
              <FcGoogle className='mr-4'/> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
