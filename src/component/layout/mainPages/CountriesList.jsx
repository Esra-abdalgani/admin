import React,{ useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus,faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

import { makeRequest } from "../../../api/axios"
import Pagination from "../../pagination"



const CountriesList = () => {
  let [countriesList ,setCountriesList] = useState([])
  let navigate = useNavigate()
  let [currentPage, setCurrrentPage] = useState(1)
  let [totalPages ,setTotalPages] = useState(0)

  async function getCountriesList() {
	  let res = await makeRequest('GET' ,`/countries?page=${currentPage}`)
    setTotalPages(res.data.last_page)
    setCountriesList(res.data.data)
  } 


  useEffect(() =>{      
    getCountriesList() 
  },[currentPage])

  //there is a problem with delete. 

  async function onDelete(id){
    let res = await makeRequest('POST' ,"/countries/delete" ,JSON.stringify(id))
    // TODO GET DATA. 
  }

  function saveUpdateCountry(country){
    localStorage.setItem("country",JSON.stringify(country))
    navigate(`/admin/country/${country.id}`)
  }

  function onChangePage(pageNumber){
    setCurrrentPage(pageNumber)
  }

  let displayCountryList = () => {
    return countriesList.map(country => {
          
      return   <tr key={country.id} className="">
        <td  className="py-2">{country.name}</td>
        <td >{country.phone_code}</td>
        <td >{country.code}</td>
        <td className='text-green-600 cursor-pointer' onClick={() => saveUpdateCountry(country)} >
          <FontAwesomeIcon icon={faPenToSquare}/>
        </td>
        <td className='text-red-600 cursor-pointer'  onClick={() =>onDelete(country.id)}>
          <FontAwesomeIcon icon={faTrash}/>
        </td>
      </tr>
    })
  }


  return (
    <div className="w-full min-h-72 max-w-7xl bg-white rounded p-3">
      <div className="w-full  h-16 flex justify-between items-center border-b-2 border-b-cyan-600 ">
        <h1 className="text-xl font-semibold">Countries List</h1>
        <div>
          <button onClick={() => navigate("/admin/country/new") }  className=" px-3 py-2 rounded bg-green-600 mx-5 text-white cursor-pointer">
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
          {displayCountryList()}                        
    
        </tbody>
      </table>
    
      <Pagination currentPage={currentPage} onChangePage={onChangePage} totalPages={totalPages}/>

    </div>

  )
}

export default CountriesList