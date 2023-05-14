import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import WarehouseTableItem from "./WarehouseTableItem";
import ResHandler from "./../../components/ResHandler";

function Warehouses() {
  const navigate = useNavigate();
  if (Cookies.get("isAdmin") !== "true") navigate("/NotFound");

  const [warehouses, setWarehouses] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [addWarehouseData, setAddWarehouseData] = useState({
    name: "",
    location: "",
    supervisorId: "",
  });
  const [editWarehouseData, setEditWarehouseData] = useState({
    id: "",
    name: "",
    location: "",
    supervisorId: "",
  });
  var [isSuperFoundBool, setIsSuperFoundBool] = useState(false);
  useEffect(() => {
    getAllWarehouses();
    getInActiveSupervisors();
  }, []);

  const getAllWarehouses = () => {
    fetch("http://localhost:8000/getWarehouses")
      .then((response) => response.json())
      .then((data) => setWarehouses(data));
  };
  const addWarehouse = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/addWarehouse", {
      method: "POST",
      body: JSON.stringify({
        name: addWarehouseData.name,
        location: addWarehouseData.location,
        userID: addWarehouseData.supervisorId,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setSuperActive(addWarehouseData.supervisorId);
        getAllWarehouses();
        getInActiveSupervisors();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
        setAddWarehouseData({ name: "", location: "", supervisorId: "" });
      })
      .catch((error) => console.error(error));
  };
  const editWarehouse = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/updateWarehouse/" + editWarehouseData.id, {
      method: "PUT",
      body: JSON.stringify({
        name: editWarehouseData.name,
        location: editWarehouseData.location,
        UserId: editWarehouseData.supervisorId,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!isSuperFoundBool) {
          setWarehouseActive(editWarehouseData.id);
          setSuperActive(editWarehouseData.supervisorId);
        }
        getAllWarehouses();
        getInActiveSupervisors();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      });
  };
  const deleteWarehouse = (warehouse) => {
    fetch("http://localhost:8000/deleteWarehouse/" + warehouse.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setSuperInActive(warehouse.superId);
        getAllWarehouses();
        getInActiveSupervisors();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };

  // DOM Manipulation
  const editWarehouseModal = (warehouse) => {
    setEditWarehouseData({
      ...editWarehouseData,
      id: warehouse.id,
      name: warehouse.name,
      location: warehouse.location,
    });
  };
  const isSuperFound = (flag) => setIsSuperFoundBool(flag);

  //
  const getInActiveSupervisors = () => {
    fetch("http://localhost:8000/getInActiveSupervisors")
      .then((response) => response.json())
      .then((data) => setSupervisors(data));
  };
  const setSuperActive = (id) => {
    fetch("http://localhost:8000/setActive/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllWarehouses();
        getInActiveSupervisors();
        if (data.error) ResHandler(data.error, "danger");
      })
      .catch((error) => console.error(error));
  };
  const setSuperInActive = (id) => {
    fetch("http://localhost:8000/setInActive/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllWarehouses();
        if (data.error) ResHandler(data.error, "danger");
      })
      .catch((error) => console.error(error));
  };
  const setWarehouseActive = (id) => {
    fetch("http://localhost:8000/setWarehouseActive/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllWarehouses();
        if (data.error) ResHandler(data.error, "danger");
      });
  };

  //View
  const showSupervisor = () => {
    return (
      <div className="mb-3">
        <label htmlFor="editWarehouseSuper" className="form-label">
          Supervisor
        </label>
        <select
          className="form-select"
          id="editWarehouseSuper"
          value={editWarehouseData.supervisorId}
          onChange={(e) =>
            setEditWarehouseData({
              ...editWarehouseData,
              supervisorId: e.target.value,
            })
          }
        >
          <option>Select Supervisor:</option>
          {supervisors.map((supervisor) => {
            return (
              <option key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2">
          <i className="bi bi-houses-fill mx-2"></i>
          Warehouses
        </h1>
        <button
          className="btn btn-sm btn-outline-dark rounded"
          data-bs-toggle="modal"
          data-bs-target="#addWarehouse"
        >
          <i className="bi bi-house-add-fill fs-4"></i>
        </button>
      </div>

      <table className="table table-striped table-bordered table-hover text-center my-3">
        <thead className="table-dark">
          <tr>
            <th className="col-1">#</th>
            <th className="col-3">Name</th>
            <th className="col-2">Location</th>
            <th className="col-3">Supervisor Name</th>
            <th className="col-1">Status</th>
            <th className="col-2">Action</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {warehouses.map((warehouse, index) => {
            return (
              <WarehouseTableItem
                key={warehouse.id}
                id={warehouse.id}
                index={index + 1}
                name={warehouse.name}
                superName={warehouse.User?.name}
                superId={warehouse.User?.id}
                location={warehouse.location}
                status={warehouse.isActive}
                products={warehouse.products}
                editModal={editWarehouseModal}
                isSuperFound={isSuperFound}
                deleteWarehouse={deleteWarehouse}
              />
            );
          })}
        </tbody>
      </table>

      {/* <!-- Modals --> */}
      <div
        className="modal fade"
        id="addWarehouse"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={addWarehouse}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Warehouse
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
                  <label htmlFor="addWarehouseName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addWarehouseName"
                    value={addWarehouseData.name}
                    onChange={(e) =>
                      setAddWarehouseData({
                        ...addWarehouseData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addWarehouseLocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addWarehouseLocation"
                    value={addWarehouseData.location}
                    onChange={(e) =>
                      setAddWarehouseData({
                        ...addWarehouseData,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select mt-4"
                    id="addWarehouseSuper"
                    value={addWarehouseData.supervisorId}
                    onChange={(e) =>
                      setAddWarehouseData({
                        ...addWarehouseData,
                        supervisorId: e.target.value,
                      })
                    }
                  >
                    <option>Selet Supervisor:</option>
                    {supervisors.map((supervisor) => {
                      return (
                        <option key={supervisor.id} value={supervisor.id}>
                          {supervisor.name}
                        </option>
                      );
                    })}
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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editWarehouse"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={editWarehouse}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Warehouse
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input type="hidden" id="warehouseId" />
                <div className="mb-3">
                  <label htmlFor="editWarehouseName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editWarehouseName"
                    value={editWarehouseData.name}
                    onChange={(e) =>
                      setEditWarehouseData({
                        ...editWarehouseData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editWarehouseLocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editWarehouseLocation"
                    value={editWarehouseData.location}
                    onChange={(e) =>
                      setEditWarehouseData({
                        ...editWarehouseData,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
                {!isSuperFoundBool && showSupervisor()}
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
}

export default Warehouses;
