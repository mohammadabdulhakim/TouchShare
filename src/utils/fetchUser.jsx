export const fetchUser =()=>{
  const userInfo = localStorage.user !== undefined && localStorage.user !== null && localStorage.user !== '' ? JSON.parse(localStorage.user) : localStorage.clear()

  return userInfo
} 