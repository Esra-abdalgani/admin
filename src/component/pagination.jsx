import { faArrowRight ,faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const Pagination = ({currentPage , getPageNumber}) =>
{
   let [num, setNum] = useState(1)


   const pages = [
      { page: num },
      { page: num + 1 },
      { page: num + 2 },
      { page: num + 3 },
   ]
   function Next ()
   {
      setNum(++num)
      getPageNumber(num => num + 1)
 
   }
   function back ()
   {
      num > 1 && setNum(--num)
      getPageNumber(num => num - 1)
   }
   return (
      <div className="flex bg-white rounded-lg font-[Poppins]">
         <button onClick={back} className=" hover:bg-indigo-600 hover:text-white">
            <FontAwesomeIcon icon={faArrowLeft} /> 
         </button>
         {
            pages.map((pg, i) => (
               <button key={i} onClick={() => getPageNumber(pg.page)} className={` ${currentPage === pg.page && 'bg-indigo-600 '}`}>{pg.page}</button>
            ))
         }
         <button onClick={Next} className="hover:bg-indigo-600 hover:text-white">
            <FontAwesomeIcon icon={faArrowRight} /> 
         </button>
      </div>
   )
}

export default Pagination
