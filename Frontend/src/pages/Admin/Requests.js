import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AdminRequestTableItem from "./AdminRequestTableItem";
import SuperRequestTableItem from "../Supervisor/SuperRequestTableItem";
import ResHandler from "../../components/ResHandler";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [editRequestData, setEditRequestData] = useState({
    id: null,
    quantity: "",
    isIncrease: "",
  });
  useEffect(() => getAllRequests(), []);

  const getAllRequests = () => {
    fetch("http://localhost:8000/getRequests", {
      method: "GET",
      headers: { userid: Cookies.get("id") },
    })
      .then((response) => response.json())
      .then((data) => setRequests(data));
  };
  const acceptRequest = (request) => {
    fetch("http://localhost:8000/acceptRequest", {
      method: "GET",
      headers: { "Content-Type": "application/json", requestid: request.id },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllRequests();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };
  const rejectRequest = (id) => {
    fetch("http://localhost:8000/rejectRequest", {
      method: "GET",
      headers: { "Content-Type": "application/json", requestid: id },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllRequests();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };
  const deleteRequest = (id) => {
    fetch("http://localhost:8000/deleteRequest/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllRequests();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };
  const editRequest = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/updateRequest/" + editRequestData.id, {
      method: "PUT",
      body: JSON.stringify({
        quantity: editRequestData.quantity,
        isIncrease: editRequestData.isIncrease,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllRequests();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      });
  };
  const editRequestModal = (request) => {
    setEditRequestData({
      id: request.id,
      quantity: request.requestedQuantity,
      isIncrease: request.isIncrease,
    });
  };

  //View
  const Admin = () => {
    return (
      <table className="table table-striped table-bordered table-hover text-center my-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Requested Quantity</th>
            <th>Stock Quantity</th>
            <th>Request Status</th>
            <th>Supervisor Name</th>
            <th className="col-2">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {requests.map((request, index) => {
            return (
              <AdminRequestTableItem
                key={request.id}
                index={index}
                id={request.id}
                productImage={request.Product?.image}
                productName={request.Product?.name}
                superName={request.User?.name}
                requestedQuantity={request.quantity}
                stock={request.Product?.stock}
                isActive={request.isAcitve}
                isAccepted={request.isAccepted}
                isIncrease={request.isIncrease}
                acceptRequest={acceptRequest}
                rejectRequest={rejectRequest}
              />
            );
          })}
        </tbody>
      </table>
    );
  };
  const Supervisor = () => {
    return (
      <>
        <table className="table table-striped table-bordered table-hover text-center my-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Requested Quantity</th>
              <th>Request Status</th>
              <th>Stock Quantity</th>
              <th className="col-2">Action</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {requests.map((item, index) => {
              return (
                <SuperRequestTableItem
                  key={item.id}
                  index={index}
                  id={item.id}
                  productImage={item.Product?.image}
                  productName={item.Product?.name}
                  requestedQuantity={item.quantity}
                  stock={item.Product?.stock}
                  isIncrease={item.isIncrease}
                  isActive={item.isAcitve}
                  isAccepted={item.isAccepted}
                  deleteRequest={deleteRequest}
                  editRequestModal={editRequestModal}
                />
              );
            })}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="editRequest"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={editRequest}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="requestQuantity" className="form-label">
                      Request Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="requestQuantity"
                      value={editRequestData.quantity}
                      onChange={(e) =>
                        setEditRequestData({
                          ...editRequestData,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="isIncrease" className="form-label">
                      Edit Request Quantity
                    </label>
                    <select
                      className="form-control"
                      id="isIncrease"
                      value={editRequestData.isIncrease}
                      onChange={(e) =>
                        setEditRequestData({
                          ...editRequestData,
                          isIncrease: e.target.value,
                        })
                      }
                    >
                      <option>Choose Status:</option>
                      <option value={true}>Increase</option>
                      <option value={false}>Decrease</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-dark px-4"
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* {requests.length <= 0 && ResHandler("There are no requests in the meantime!","danger")} */}
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2">
          <i className="bi bi-bell mx-2"></i>
          Requests
        </h1>
      </div>
      {Cookies.get("isAdmin") === "true" ? Admin() : Supervisor()}
    </>
  );
}

export default Requests;
