import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './layout/Header'
import SideBar from './layout/SideBar'




const Layout = () => {

  return (
    <div className=' flex w-full h-screen  text-grey-90'>
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header/>
        <Outlet/>
      </div>
    </div>
     

  )
}

export default Layout
