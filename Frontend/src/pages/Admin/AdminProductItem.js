import React from "react";

function AdminProductItem(props) {
  return (
    <div className="col-4">
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4" style={{ height: "140px", width: "120px" }}>
            <img
              src={props.img}
              className="img-fluid rounded-start border w-100 h-100"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-center">{props.name}</h5>
              <p className="card-text text-center" style={{ textAlign: "justify" }}>
                {props.description}
              </p>
              <div className="d-flex justify-content-around align-items-center">
                <span className="card-text">
                  <small className="text-body-secondary">
                    {"Stock: " + props.stock}
                  </small>
                </span>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-decoration-none me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editProduct"
                    onClick={() => props.editProductModal(props)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger text-decoration-none"
                    onClick={() => props.deleteProduct(props)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductItem;
