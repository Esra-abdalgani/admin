import { useState ,useEffect } from 'react'
import { makeRequest } from '../../../api/axios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuid } from 'uuid'



const Config = () => {
  let { auth } = useAuth()
  let [configObject,setConfigObject] = useState({})
  const navigate = useNavigate();


  useEffect(() => {
    const getGonfigList = async () => {
      let res = await makeRequest('GET' ,'/admin/config')
      setConfigObject(res.data[0] || '')
    }
    getGonfigList()
  },[])

  function saveUpdateConfig(key){
    localStorage.setItem('config',JSON.stringify({ [key]:`${configObject[key]}` }))
    navigate(`/admin/configEdit/${key}`)
  }

  let displayConfigList = () => {
    let ConfigKeys = Object.keys(configObject)
    return ConfigKeys.map(key => {
      return  <tr key={uuid()} >
                  <td className="p-2" >{key}</td>
                  <td>{configObject[key]}</td>
                  <td className='text-green-600 cursor-pointer' onClick={() => saveUpdateConfig(key) }>
                    <FontAwesomeIcon icon={faPenToSquare}/> 
                  </td>
              </tr>
    })
  }

  return (
    <div className="w-full min-h-72 max-w-7xl bg-white rounded p-3">
      <div className="w-full  h-16 flex justify-between items-center border-b-2 border-b-cyan-600 ">
        <h1 className="text-xl font-semibold">configuration</h1>

        <div>

          <button onClick={() => navigate('/admin/configEdit/new') }  className=" px-3 py-2 rounded bg-green-600 mx-5 text-white cursor-pointer">
            <FontAwesomeIcon icon={faCirclePlus}/> Create Config
          </button>

        </div>

      </div>

      <table className=" table-auto w-full mt-5 ">

        <thead>
          <tr className="text-left text-lg ">
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>

        <tbody>
          {displayConfigList()}                        
        </tbody>

      </table>
    </div>

  )
}

export default Config
