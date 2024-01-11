import { IoIosSearch } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
const Customs = () => {
    return (
        <tr>
            <td><IoIosSearch /></td>
            <td><input type="text" /></td>
            <td><input type="number" /></td>
            <td>$<input type="number" /></td>
            <td>$<input type="number" /></td>
            <td><input type="text" /></td>
            <td><select style={{ height: "31px", width: "135px" }}>
                <option>United States</option>
            </select></td>
            <td><MdDeleteForever style={{width:"35px",height:"20px"}}/></td>
        </tr>
    )
}

export default Customs