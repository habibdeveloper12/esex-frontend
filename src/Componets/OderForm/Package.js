import React from "react";
import Table from "react-bootstrap/Table";
const Package = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th
              className="pb-3 pl-3 fw-bold cap text-uppercase text-secondary fs-7 "
              style={{ width: "12rem" }}
            >
              Number of Package
            </th>
            <th>
              Weight per package <br></br> Max. weight 997.9 kg{" "}
            </th>
            <th colSpan={3}>
              Dimensions per package <br></br> L × W × H (Optional){" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>Thornton</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>@twitter</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Package;
