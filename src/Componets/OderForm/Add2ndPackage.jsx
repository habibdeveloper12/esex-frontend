import { MdDeleteForever } from "react-icons/md";
const Add2ndPackage = () => {
  return (
    <div className="secondFormA" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",flexWrap:"wrap",
       width:"100%", height:"auto"}}>
          <h6 style={{textAlign:"center"}}>Package QTY</h6>
          <input type="number" style={{width:"90px",alignContent:"center"}}/>
          <h6 style={{textAlign:"center"}}>WEIGHT PER PACKAGE</h6>
          <input type="number" style={{width:"90px",alignContent:"center"}}/>
          <select style={{width:"90px",alignContent:"center"}}>
            <option>lb</option>
            <option>kg</option>
          </select>
          <span style={{textAlign:"center"}}>OZ</span>
          <h6 style={{textAlign:"center"}}> DIMENSIONS <br></br> L × W × H {" "}</h6>
          <input type="number" style={{width:"90px",alignContent:"center"}}/>
          <input type="number" style={{width:"90px",alignContent:"center"}}/>
          <input type="number" style={{width:"90px",alignContent:"center"}}/>
          <p style={{textAlign:"center"}}>IN</p>
          <h6 style={{textAlign:"center"}}>Delete</h6>
          <MdDeleteForever style={{width:"30px",height:"40px"}}/><hr/>
          
      </div>
  )
}

export default Add2ndPackage