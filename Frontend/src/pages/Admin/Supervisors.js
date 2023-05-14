import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SupervisorTableItem from "./SupervisorTableItem";
import ResHandler from "../../components/ResHandler";

function Supervisors() {
  const navigate = useNavigate();
  if (Cookies.get("isAdmin") !== "true") navigate("/NotFound");

  const [users, setUsers] = useState([]);
  const [addSuperData, setAddSuperData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [editSuperData, setEditSuperData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  useEffect(() => getAllSupervisors(), []);

  const getAllSupervisors = () => {
    fetch("http://localhost:8000/getAllSupervisors")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };
  const addSupervisor = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/addSupervisor", {
      method: "POST",
      body: JSON.stringify({
        name: addSuperData.name,
        email: addSuperData.email,
        password: addSuperData.password,
        phone: addSuperData.phone,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllSupervisors();
        data.errors
          ? data.errors.map((err) => ResHandler(err, "danger"))
          : ResHandler(data.message);
        setAddSuperData({ name: "", email: "", password: "", phone: "" });
      });
  };
  const updateSupervisor = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/updateSupervisor/" + editSuperData.id, {
      method: "POST",
      body: JSON.stringify({
        name: editSuperData.name,
        email: editSuperData.email,
        phone: editSuperData.phone,
        password: editSuperData.password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllSupervisors();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      });
  };
  const deleteSupervisor = (supervisor) => {
    fetch("http://localhost:8000/deleteSupervisor/" + supervisor.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setWarehouseInActive(supervisor.warehouseId);
        getAllSupervisors();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };

  //DOM Manipulation
  const editSupervisorModal = (supervisor) => {
    setEditSuperData({
      ...editSuperData,
      id: supervisor.id,
      name: supervisor.name,
      email: supervisor.email,
      phone: supervisor.phone,
    });
  };

  //
  const setWarehouseInActive = (id) => {
    fetch("http://localhost:8000/setWarehouseInActive/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) ResHandler(data.error, "danger");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2">
          <i className="bi bi-people mx-2"></i>
          Supervisors
        </h1>
        <button
          className="btn btn-sm btn-outline-dark rounded"
          data-bs-toggle="modal"
          data-bs-target="#addSupervisor"
        >
          <i className="bi bi-person-add fs-4"></i>
        </button>
      </div>

      <table className="table table-striped table-bordered table-hover text-center my-3">
        <thead className="table-dark">
          <tr>
            <th className="col-1">#</th>
            <th className="col-2">Name</th>
            <th className="col-2">Email</th>
            <th className="col-2">Phone</th>
            <th className="col-1">Status</th>
            <th className="col-2">Warehouse Name</th>
            <th className="col-2">Action</th>
          </tr>
        </thead>

        <tbody className="table-group-divider">
          {users.map((user, index) => {
            return (
              <SupervisorTableItem
                key={user.id}
                id={user.id}
                index={index}
                name={user.name}
                email={user.email}
                password={user.password}
                phone={user.phone}
                status={user.isActive}
                warehouseId={user.Warehouses[0]?.id}
                warehouseName={user.Warehouses[0]?.name}
                editModal={editSupervisorModal}
                deleteSuper={deleteSupervisor}
              />
            );
          })}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="addSupervisor"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={addSupervisor}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Supervisor
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
                  <label htmlFor="addSuperName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addSuperName"
                    name="name"
                    value={addSuperData.name}
                    onChange={(e) =>
                      setAddSuperData({ ...addSuperData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addSuperEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="addSuperEmail"
                    name="email"
                    value={addSuperData.email}
                    onChange={(e) =>
                      setAddSuperData({
                        ...addSuperData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addSuperPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="addSuperPassword"
                    name="password"
                    value={addSuperData.password}
                    onChange={(e) =>
                      setAddSuperData({
                        ...addSuperData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="addSuperPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addSuperPhone"
                    name="phone"
                    value={addSuperData.phone}
                    onChange={(e) =>
                      setAddSuperData({
                        ...addSuperData,
                        phone: e.target.value,
                      })
                    }
                  />
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
        id="editSupervisor"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={updateSupervisor}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Supervisor
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
                  <label htmlFor="editSuperName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editSuperName"
                    value={editSuperData.name}
                    onChange={(e) =>
                      setEditSuperData({
                        ...editSuperData,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editSuperEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="editSuperEmail"
                    value={editSuperData.email}
                    onChange={(e) =>
                      setEditSuperData({
                        ...editSuperData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editSuperPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editSuperPhone"
                    value={editSuperData.phone}
                    onChange={(e) =>
                      setEditSuperData({
                        ...editSuperData,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-outline-dark my-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#editPassword"
                    aria-expanded="false"
                    aria-controls="collapseWidthExample"
                  >
                    Change Password
                  </button>
                  <div
                    id="editPassword"
                    className="collapse collapse-horizontal"
                  >
                    <div style={{ width: "465px" }}>
                      <label htmlFor="editSuperPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="editSuperPassword"
                        value={editSuperData.password}
                        onChange={(e) =>
                          setEditSuperData({
                            ...editSuperData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
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
}

export default Supervisors;
