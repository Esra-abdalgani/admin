import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus,faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import axios from '../../api/axios'
import Pagination from '../pagination'



const ProductsList = () => {
    let [countriesList ,setProductList] = useState([])
    let navigate = useNavigate()
    let [currentPage, setCurrrentPage] = useState(1)


    async function getProdectList() {
      try {
        const response = await axios.get(`/countries?page=${currentPage}`);
        console.log(response.data.data)
        setProductList(response.data.data.data)
      } catch (error) {
        console.error(error);
      }
    } 


    useEffect(() =>{      
      getProdectList() 
    },[currentPage])

    async function onDelete(id){
      console.log(JSON.stringify({id}),'sdfghj')
      try{
        const response = await axios.post('/countries/delete',JSON.stringify(id))
        console.log(response.data)
        
      }catch(err){
        console.error(err)
      }}

      function getPageNumber(pageNumber){
        setCurrrentPage(pageNumber)
      }


  return (
      <div className="w-full min-h-72 max-w-7xl bg-white rounded p-3">
      <div className="w-full  h-16 flex justify-between items-center border-b-2 border-b-cyan-600 ">
          <h1 className="text-xl font-semibold">Countries List</h1>
          <div>
              <button onClick={() => navigate('/admin/country/new') }  className=" px-3 py-2 rounded bg-green-600 mx-5 text-white cursor-pointer">
              <FontAwesomeIcon icon={faCirclePlus}/>Add Country</button>
          </div>
      </div>
    <table className=" table-auto w-full mt-5 ">
      <thead>
          <tr className="text-left text-lg ">
            <th>Name</th>
            <th>Phone Code</th>
            <th>Code</th>
          </tr>
      </thead>

      <tbody>
        {countriesList.map(country => {
          
        return     <tr key={country.id} className="">
        <td  className="py-2">{country.name}</td>
        <td >{country.phone_code}</td>
        <td >{country.code}</td>
        <td className='text-green-600 cursor-pointer' onClick={() =>{
               localStorage.setItem('country',JSON.stringify(country))
               navigate(`/admin/country/${country.id}`)
        }} ><FontAwesomeIcon icon={faPenToSquare}/> </td>
        <td className='text-red-600 cursor-pointer'  onClick={() =>onDelete(country.id)}><FontAwesomeIcon icon={faTrash}/></td>
    </tr>
    })}                        
    
        </tbody>
    </table>
    
  <Pagination currentPage={currentPage} getPageNumber={getPageNumber}/>

    </div>



   
   




  )
}

export default ProductsList
