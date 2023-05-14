import React from "react";
import { useNavigate } from "react-router-dom";

function WarehouseTableItem(props) {
  const navigate = useNavigate();
  const confirmDeletion = () => {
    document.getElementById("actionData" + props.id).classList.add("d-none");
    document
      .getElementById("confirmData" + props.id)
      .classList.remove("d-none");
  };
  const closeDeletion = () => {
    document.getElementById("actionData" + props.id).classList.remove("d-none");
    document.getElementById("confirmData" + props.id).classList.add("d-none");
  };

  return (
    <tr>
      <th>{props.index}</th>
      <td>{props.name}</td>
      <td>{props.location}</td>
      <td>{props.superName ? props.superName : "Not Assigned"}</td>
      <td>{props.status ? "Active" : "inActive"}</td>
      <td
        id={"actionData" + props.id}
        className="d-flex justify-content-evenly"
      >
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => navigate("/warehouses/" + props.id)}
        >
          <i className="bi bi-eye fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#editWarehouse"
          onClick={() => {
            props.superId
              ? props.isSuperFound(true)
              : props.isSuperFound(false);
            props.editModal(props);
          }}
        >
          <i className="bi bi-pencil fs-6"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => confirmDeletion()}
        >
          <i className="bi bi-trash-fill fs-6"></i>
        </button>
      </td>
      <td
        id={"confirmData" + props.id}
        className="d-none d-flex justify-content-evenly"
      >
        <button
          type="button"
          className="btn btn-sm btn-danger col-8"
          onClick={() => props.deleteWarehouse(props)}
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

export default WarehouseTableItem;
