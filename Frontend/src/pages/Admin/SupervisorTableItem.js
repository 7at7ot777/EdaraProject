import React from "react";
import { Link } from "react-router-dom";

function SupervisorTableItem(props) {
  const link = () => {
    return (
      <Link
        to={"/Warehouses/" + props.warehouseId}
        className="link-dark"
      >
        {props.warehouseName}
      </Link>
    );
  };
  const confirmDeletion = () => {
    document.getElementById("actionData" + props.id).classList.add("d-none");
    document.getElementById("confirmData" + props.id).classList.remove("d-none");
  };
  const closeDeletion = () => {
    document.getElementById("actionData" + props.id).classList.remove("d-none");
    document.getElementById("confirmData" + props.id).classList.add("d-none");
  };
  return (
    <tr>
      <th>{props.index + 1}</th>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td>{props.status ? "Active" : "inActive"}</td>
      <td>{props.warehouseId ? link() : "Not Assigned"}</td>
      <td id={"actionData" + props.id} className="d-flex justify-content-evenly">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary col-5"
          data-bs-toggle="modal"
          data-bs-target="#editSupervisor"
          onClick={() => props.editModal(props)}
        >
          <i className="bi bi-pencil fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger col-5"
          onClick={confirmDeletion}
        >
          <i className="bi bi-trash-fill fs-6"></i>
        </button>
      </td>
      <td id={"confirmData" + props.id} className="d-none d-flex justify-content-evenly">
        <button
          type="button"
          className="btn btn-sm btn-danger col-8"
          onClick={() => props.deleteSuper(props)}
        >
          <i className="bi bi-trash fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary col-3"
          onClick={closeDeletion}
        >
          <i className="bi bi-x fs-6"></i>
        </button>
      </td>
    </tr>
  );
}

export default SupervisorTableItem;
