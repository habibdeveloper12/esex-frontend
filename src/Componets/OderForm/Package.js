import { useState } from "react";
import Table from "react-bootstrap/Table";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddToPhotos } from "react-icons/md";
import AddPackage from "./AddPackage";
import "./package.css";
import Add2ndPackage from "./Add2ndPackage";
import { useFieldArray, useForm } from "react-hook-form";
const Package = ({control,handleSubmit,register,fields, append, remove ,onSubmit}) => {
  const [packageon, setPackageon] = useState(true);
  const [pac, setPac] = useState(true);

  return (
    <>
         <Table striped bordered hover className="tableHead">
        <thead>
          <tr>
            <th
              className="pb-3 pl-3 fw-bold cap text-uppercase text-secondary fs-7 "
              style={{ width: "40px" }}
            >
              Package QTY
            </th>
            <th colSpan={3}>WEIGHT PER PACKAGE</th>
            <th colSpan={4} className="text-center">
              DIMENSIONS <br /> L × W × H{" "}
            </th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => (
            <tr key={item.id}>
              <td>
                <input
                required
                  {...register(`packages.${index}.qty`)}
                  style={{ width: "50%" }}
                />
              </td>
              <td className="">
                <input
                required
                  {...register(`packages.${index}.weight`)}
                  type="number"
                  style={{ width: "100%" }}
                />
              </td>
              <td className="">
                <select
                  {...register(`packages.${index}.unit`)}
                  style={{ width: "100%" }}
                >
                  <option defaultChecked>lb</option>
                  <option>kg</option>
                </select>
              </td>
               <td>
                oz
              </td> 
              <td className="">
                <input
                required
                  {...register(`packages.${index}.length`)}
                  type="number"
                  style={{ width: "100%" }}
                />
              </td>
              <td className="">
                <input
                  {...register(`packages.${index}.width`)}
                  type="number"
                  required
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                required
                  {...register(`packages.${index}.height`)}
                  type="number"
                  style={{ width: "100%" }}
                />
              </td>
              <td className=" border-start-1 border-secondary">in</td>
              <td className="d-flex flex-row justify-content-center">
                {
                  fields.length==1 ? <> <MdDeleteForever
                  className="w-75 h-75"
                /> </>:<>   <MdDeleteForever
                  className="w-75 h-75"
                  onClick={() => remove(index)}
                /></>
                }
             
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    
        <MdOutlineAddToPhotos
          style={{ width: "30px", height: "30px" }}
          className="d-inline"
          onClick={() => append({})}
        />
    

   

     {/* <div
        className="secondForm"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          width: "300px",
          height: "auto",
        }}
      >
        <h6 style={{ textAlign: "center" }}>Package QTY</h6>
        <input
          type="number"
          style={{ width: "90px", alignContent: "center" }}
        />
        <h6 style={{ textAlign: "center" }}>WEIGHT PER PACKAGE</h6>
        <input
          type="number"
          style={{ width: "90px", alignContent: "center" }}
        />
        <select style={{ width: "90px", alignContent: "center" }}>
          <option>lb</option>
          <option>kg</option>
        </select>
        <span style={{ textAlign: "center" }}>OZ</span>
        <h6 style={{ textAlign: "center" }}>
          {" "}
          DIMENSIONS <br></br> L × W × H{" "}
        </h6>
        <input
          type="number"
          style={{ width: "90px", alignContent: "center" }}
        />
        <input
          type="number"
          style={{ width: "90px", alignContent: "center" }}
        />
        <input
          type="number"
          style={{ width: "90px", alignContent: "center" }}
        />
        <p style={{ textAlign: "center" }}>IN</p>
        <h6 style={{ textAlign: "center" }}>Delete</h6>
        <MdDeleteForever style={{ width: "30px", height: "40px" }} />
        <hr />
        {pac && <Add2ndPackage />}
        <br />
        <MdOutlineAddToPhotos
          style={{ width: "30px", height: "30px" }}
          className="d-inline"
          onClick={() => setPac(!pac)}
        />
        <hr />
      </div>  */}
    </>
  );
};

export default Package;
