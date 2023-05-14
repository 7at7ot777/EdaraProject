import React from "react";

function AdminRequestTableItem(props) {
  const handleApprove = () => {
    document
      .getElementById("confirmData" + props.id)
      .classList.remove("d-none");
    document.getElementById("actionData" + props.id).classList.add("d-none");
    document
      .getElementById("confirmRejection" + props.id)
      .classList.add("d-none");
  };
  const handleReject = () => {
    document
      .getElementById("confirmData" + props.id)
      .classList.remove("d-none");
    document.getElementById("actionData" + props.id).classList.add("d-none");
    document
      .getElementById("confirmAcceptance" + props.id)
      .classList.add("d-none");
  };
  const handleConfirmAcceptance = () => {
    console.log("Confirm Acceptance");
    props.acceptRequest(props);
  };
  const handleConfirmRejection = () => {
    props.rejectRequest(props.id);
    console.log("Confirm Rejection");
  };
  const handleActionClose = () => {
    document
      .getElementById("confirmAcceptance" + props.id)
      .classList.remove("d-none");
    document
      .getElementById("confirmRejection" + props.id)
      .classList.remove("d-none");
    document.getElementById("confirmData" + props.id).classList.add("d-none");
    document.getElementById("actionData" + props.id).classList.remove("d-none");
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
              className="btn btn-sm btn-outline-success col-5"
              onClick={handleApprove}
            >
              <i className="bi bi-check fs-6"></i>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger col-5"
              onClick={handleReject}
            >
              <i className="bi bi-x fs-6"></i>
            </button>
          </td>
          <td
            id={"confirmData" + props.id}
            className="d-none d-flex justify-content-evenly"
          >
            <button
              type="button"
              className="btn btn-sm btn-success col-8"
              id={"confirmAcceptance" + props.id}
              onClick={handleConfirmAcceptance}
            >
              <i className="bi bi-check2 fs-6"></i>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger col-8"
              id={"confirmRejection" + props.id}
              onClick={handleConfirmRejection}
            >
              <i className="bi bi-x fs-6"></i>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary col-3"
              onClick={handleActionClose}
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
  const handleStatus = () => {
    return props.isIncrease ? (
      <td className="text-success fw-bold">Increase</td>
    ) : (
      <td className="text-danger fw-bold">Decrease</td>
    );
  };
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <img
          style={{ width: "80px", height: "33px" }}
          src={props.productImage}
          alt="..."
        />
      </td>
      <td className="fw-bold">{props.productName}</td>
      <td>{props.requestedQuantity}</td>
      <td>{props.stock}</td>
      {handleStatus()}
      <td>{props.superName}</td>
      {handleAction()}
    </tr>
  );
}

export default AdminRequestTableItem;
