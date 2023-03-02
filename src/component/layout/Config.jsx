import {useState ,useEffect} from 'react'
import axios from '../../api/axios'
import { useNavigate,useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faEye,faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'



const Config = () => {
let {auth} = useAuth()
let [configObject,setConfigObject] = useState({})
   const navigate = useNavigate();
  const location = useLocation();
console.log(auth)

  useEffect(() => {
  const getGonfigList = async () => {
    try{
      const response = await axios.get('/admin/config')
      console.log(response.data.data)
      setConfigObject(response.data.data[0])
    }catch(err){
      console.error(err)
    }
  }

  getGonfigList()
},[])

let ConfigKeys = Object.keys(configObject)
  return (
    <div className="w-full min-h-72 max-w-7xl bg-white rounded p-3">
    <div className="w-full  h-16 flex justify-between items-center border-b-2 border-b-cyan-600 ">
    <h1 className="text-xl font-semibold">configuration</h1>
    <div>
        <button onClick={() => navigate('/admin/configEdit/new') }  className=" px-3 py-2 rounded bg-green-600 mx-5 text-white cursor-pointer">
        <FontAwesomeIcon icon={faCirclePlus}/> Create Config</button>
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
        {ConfigKeys.map(key => {
        return     <tr >
        <td className="p-2" >{key}</td>
        <td>{configObject[key]}</td>
        
        <td className='text-green-600 cursor-pointer' onClick={() => {
              localStorage.setItem('config',JSON.stringify({[key]:`${configObject[key]}`}))
               navigate(`/admin/configEdit/${key}`)
        }}><FontAwesomeIcon icon={faPenToSquare}/> </td>

    </tr>
    })}                        
    
        </tbody>
    </table>
</div>

  )
}

export default Config
