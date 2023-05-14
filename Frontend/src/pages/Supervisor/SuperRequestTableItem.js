import React from "react";

function SuperRequestTableItem(props) {
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
  const handleAction = () => {
    if (props.isActive) {
      return (
        <>
          <td
            id={"actionData" + props.id}
            className="d-flex justify-content-evenly"
          >
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary col-5"
              data-bs-toggle="modal"
              data-bs-target="#editRequest"
              onClick={() => props.editRequestModal(props)}
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
          <td
            id={"confirmData" + props.id}
            className="d-none d-flex justify-content-evenly"
          >
            <button
              type="button"
              className="btn btn-sm btn-danger col-8"
              onClick={() => props.deleteRequest(props.id)}
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
        </>
      );
    } else {
      if (props.isAccepted)
        return <td className="text-success fw-bolder">Accepted</td>;
      else return <td className="text-danger fw-bolder">Rejected</td>;
    }
  };
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <img
          src={props.productImage}
          style={{ width: "80px", height: "33px" }}
          alt="..."
        />
      </td>
      <td className="fw-bold">{props.productName}</td>
      <td>{props.requestedQuantity}</td>
      {props.isIncrease ? (
        <td className="text-success fw-bolder">Increase</td>
      ) : (
        <td className="text-danger fw-bolder">Decrease</td>
      )}
      <td>{props.stock}</td>
      {handleAction()}
    </tr>
  );
}

export default SuperRequestTableItem;
