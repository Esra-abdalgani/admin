import { faBell, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = () => {
  return (
    <header className="w-full p-5 min-h-topbar max-h-topbar pr-xlarge pl-base bg-white border-b border-grey-20 sticky top-0 flex justify-between items-center z-40">
    
      <div className="">
        <FontAwesomeIcon className='px-5 ' icon={faMagnifyingGlass} />
        <input type="text"
          className='outline-0'
          placeholder="Search"/>
      </div>

      <div className="text-lg ">
        <FontAwesomeIcon className='mx-5 cursor-pointer' icon={faBell}/>
        <FontAwesomeIcon className='cursor-pointer' icon={faUser}/>
      </div>
      
    </header>

  )
}

export default Header
