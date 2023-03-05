import {  faGear,faRightFromBracket, faEarthAmerica } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { makeRequest } from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  let navigate = useNavigate()

  async function logout(){
    let response = await  makeRequest('GET' ,'/admins/logout')
    console.log(response)
    navigate('/')
  }

  return (
    <div className="min-w-sidebar max-w-sidebar h-screen overflow-y-auto bg-gray-0 border-r border-grey-20 py-base px-base">
      <div className='w-96 text-emerald-500	font-bold p-7 text-8xl'>
        UBitc
      </div>
      <ul className='p-5 text-xl '>
        <li  className='p-2 hover:bg-slate-100 cursor-pointer' onClick={() => navigate('countriesList')}>
          <FontAwesomeIcon icon={faEarthAmerica}/>
          {'  '}Countries</li>
        <li className='p-2 hover:bg-slate-100 cursor-pointer' onClick={() => navigate('config')}>
          <FontAwesomeIcon icon={faGear}/>
          {'  '}configuration</li>

        <li className='p-2 hover:bg-slate-100 cursor-pointer' onClick={() => logout()} >
          <FontAwesomeIcon icon={faRightFromBracket}/>
          {'  '}Log out</li>


    
      </ul>

    </div>
      
    
  )
}

export default SideBar
