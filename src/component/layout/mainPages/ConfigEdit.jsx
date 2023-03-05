import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { makeRequest } from '../../../api/axios' 

const ConfigEdit = () => {
  let navigate = useNavigate()
  const { k } = useParams()
  let [config ,setconfig] = useState({
    key:'',
    value:''
  })

  function handleChange(e){
    let { name , value } = e.target
    setconfig(config =>({ ...config,[name]:`${value}` }))
  }


  useEffect(() => {
    if(!k || k === 'new') return
    let configr = JSON.parse(localStorage.getItem('config'))
    let key =  Object.keys(configr)[0] || ''
    let value = configr[key] || ''
    
    setconfig({
      key : key,
      value : value
    })
  },[])



  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = k !== "new" ? "update" : "store";
    let response = await  makeRequest('POST' ,`/admin/config/${action}`,JSON.stringify({ [config.key]:config.value }))
    //there is a problem with this request .
    setconfig({})
    return navigate('/admin/config')
  }



  return (

    <div className=' bg-white p-5 rounded overflow-x-hidden '>

      <div className='w-full flex text-xl justify-end   '>
        <FontAwesomeIcon onClick={() => navigate('/admin/config')}  icon={faArrowRight}/>
      </div>
      <h1 className='text-2xl font-semibold'>Information</h1>
      <form onSubmit={e => handleSubmit(e)} className='flex flex-col'>
        <br/>
        <label className='block'>
          key:

          <input
            placeholder='Name'
            type='text'
            name='key'
            value={config.key || ''}
            onChange={e => handleChange(e)}
            className='ml-5 p-2 outline-2 outline-zinc-500/50 border-b-2'
          />
        </label>
            
        <br/> 
        <label>
          value : 
          <input
            placeholder='value'
            type='text'
            name='value'
            value={config.value || ''}
            onChange={e => handleChange(e)}
            className='ml-5 p-2 outline-2 outline-zinc-500/50  border-b-2'
          />
        </label>
            
        
        <br/>


        <div>
          <button  onClick={() => navigate('/admin/config')} className='p-2 bg-zinc-200 rounded '>cancel</button>
          <button  type='submit' className='p-2 bg-zinc-200 rounded ml-2'>{k === 'new' ? 'add' : "update"}</button>
        
        </div>
      </form>
    </div>

  )
}

export default ConfigEdit
