import React from 'react'
import { MdDeleteForever } from "react-icons/md";
const AddPackage = () => {
  return (
         <tr className='tableHeadT'>
            <td><input style={{width:"50%"}}/></td>
            <td className=""><input type="number" style={{width:"100%"}}/></td>
            <td className=""><select style={{width:"100%"}}>
              <option>lb</option>
              <option>kg</option>
            </select></td>
            <td><span style={{width:"100%"}}>oz</span></td>
            <td className=""><input type="number" style={{width:"100%"}}/></td>
            <td className=""><input type="number" style={{width:"100%"}}/></td>
            <td><input type="number" style={{width:"100%"}}/></td>
            <td className='border-start-1 border-secondary'>in</td>
            <td className="d-flex flex-row justify-content-center"><MdDeleteForever 
            className="w-75 h-75"/></td>
          </tr>
          
  )
}

export default AddPackage