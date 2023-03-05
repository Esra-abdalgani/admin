import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { makeRequest } from '../../../api/axios'




const Country = () => {
  const { id } = useParams()
  console.log(id)
  const navigate = useNavigate()
  const [country ,setCountry] = useState({})

  useEffect(() => {
    if(!id || id === 'new') return;
    let country = localStorage.getItem('country')
    const fetchCountry = async () => {
      const { data } = await makeRequest('POST' ,'/countries/view',country)
      setCountry(data)
    }

    fetchCountry()
  }
  ,[])

  function handleChange(e){
    let { name , value } = e.target
    setCountry(country =>({ ...country ,id:uuid() ,[name]:`${value}` }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = id !== "new" ? "update" : "create";
    let response = await  makeRequest('POST' ,`/countries/${action}`,JSON.stringify(country))
    console.log(response)
    setCountry({})
    return navigate('/admin/countriesList')
  }

  return (
    <div className=' bg-white p-5 rounded overflow-x-hidden '>

      <div className='w-full flex text-xl justify-end   '>
        <FontAwesomeIcon onClick={() => navigate('/admin/countriesList')}  icon={faArrowRight}/>
      </div>
      <h1 className='text-2xl font-semibold'>Information</h1>
      <form onSubmit={e => handleSubmit(e)} className='flex flex-col'>
        <br/>
        <label className='block'>
          Name:

          <input
            placeholder='Name'
            type='text'
            name='name'
            value={country.name || ''}
            onChange={e => handleChange(e)}
            className='ml-5 p-2 outline-2 outline-zinc-500/50 border-b-2'
          />
        </label>
          
        <br/> 
        <label>
          Phone Code : 
          <input
            placeholder='phone code'
            type='number'
            name='phone_code'
            value={country.phone_code || ''}
            onChange={e => handleChange(e)}
            className='ml-5 p-2 outline-2 outline-zinc-500/50  border-b-2'
          />
        </label>
          
      
        <br/>

        <label >

          Code:

          <input
            placeholder='Code'
            type='text'
            name='code'
            value={country.code || ''}
            onChange={e => handleChange(e) }
            className='ml-2 p-2 border-b-2 outline-2 outline-zinc-500/50'
          />
        </label>
        <br/>

        <div>
          <button onClick={() => navigate('/admin/countriesList')}  className='p-2 bg-zinc-200 rounded '>cancel</button>
          <button  type='submit' className='p-2 bg-zinc-200 rounded ml-2'>{id === 'new' ? 'add' : "update"}</button>
      
        </div>
      </form>
    </div>
  )


}

export default Country