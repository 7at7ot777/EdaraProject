import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import AdminProductItem from "./Admin/AdminProductItem";
import SupervisorProductItem from "./Supervisor/SupervisorProductItem";
import ResHandler from "../components/ResHandler";

function ProductsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    description: "",
    stock: "",
    price: "",
    image: null,
  });
  const [request, setRequest] = useState({
    ProductID: "",
    quantity: "",
    isIncrease: "",
  });
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line
  useEffect(() => getAllProducts(), []);

  const getAllProducts = () => {
    fetch("http://localhost:8000/getAllProducts/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        data.error ? ResHandler(data.error, "danger") : setProducts(data);
      });
  };

  const addProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("stock", productData.stock);
    formData.append("price", productData.price);
    formData.append("image", productData.image);
    fetch("http://localhost:8000/addNewProduct/" + params.id, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        getAllProducts();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      });
  };

  const editProduct = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("stock", productData.stock);
    formData.append("price", productData.price);
    formData.append("image", productData.image);
    fetch("http://localhost:8000/updateProduct/" + productData.id, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        getAllProducts();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      });
  };

  const deleteProduct = (product) => {
    fetch("http://localhost:8000/deleteProduct/" + product.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        getAllProducts();
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      })
      .catch((error) => console.error(error));
  };

  const makeRequest = (event) => {
    event.preventDefault();
    const data = {
      SupervisorID: Cookies.get("id"),
      ProductID: request.ProductID,
      quantity: request.quantity,
      isIncrease: request.isIncrease,
    };
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("http://localhost:8000/makeRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((data) => {
        data.error
          ? ResHandler(data.error, "danger")
          : ResHandler(data.message);
      });
  };

  //View
  const Admin = () => {
    const editProductModal = (product) => {
      setProductData({
        ...productData,
        id: product.id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
      });
    };
    return products.map((product) => {
      console.log(product);
      return (
        <AdminProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          stock={product.stock}
          price={product.price}
          img={product.image}
          editProductModal={editProductModal}
          deleteProduct={deleteProduct}
        />
      );
    });
  };
  const Supervisor = () => {
    if (Cookies.get("warehouseId") !== params.id) navigate("../NotFound");

    const getRequestData = (requestId) => {
      setRequest({ ...request, ProductID: requestId });
    };

    return products.map((product) => {
      return (
        <SupervisorProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          img={product.image}
          stock={product.stock}
          getRequestData={getRequestData}
        />
      );
    });
  };
  const AdminModals = () => {
    return (
      <>
        <div
          className="modal fade"
          id="addProduct"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form encType="multipart/form-data" onSubmit={addProduct}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Product
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
                    <label htmlFor="addProductName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="addProductName"
                      value={productData.name}
                      onChange={(e) =>
                        setProductData({ ...productData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="addDescription"
                      rows={3}
                      value={productData.description}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          description: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addStock" className="form-label">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="addStock"
                      value={productData.stock}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          stock: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="addPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="addPrice"
                      value={productData.price}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          price: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="addImg"
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          image: e.target.files[0],
                        })
                      }
                      required
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
          id="editProduct"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form encType="multipart/form-data" onSubmit={editProduct}>
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
                    <label htmlFor="editProductName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editProductName"
                      value={productData.name}
                      onChange={(e) =>
                        setProductData({ ...productData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="editDescription"
                      rows={3}
                      value={productData.description}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editStock" className="form-label">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="editStock"
                      value={productData.stock}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          stock: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="editPrice"
                      value={productData.price}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="editFile"
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          image: e.target.files[0],
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
  const SupervisorModals = () => {
    return (
      <div
        className="modal fade"
        id="makeRequest"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={makeRequest}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Make a Request
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
                  <label htmlFor="stockRequest" className="form-label">
                    Request Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stockRequest"
                    value={request.quantity}
                    onChange={(e) =>
                      setRequest({ ...request, quantity: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-control"
                    id="isIncrease"
                    value={request.isIncrease}
                    onChange={(e) =>
                      setRequest({ ...request, isIncrease: e.target.value })
                    }
                    required
                  >
                    <option>Choose the status of your request:</option>
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
    );
  };
  const AddProductBtn = () => {
    return (
      <button
        className="btn btn-sm btn-outline-dark"
        data-bs-toggle="modal"
        data-bs-target="#addProduct"
        onClick={() =>
          setProductData({
            ...productData,
            id: "",
            name: "",
            description: "",
            stock: "",
            price: "",
            image: null,
          })
        }
      >
        <i className="bi bi-bag-plus-fill fs-4"></i>
      </button>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap py-3 mb-2 border-bottom">
        <h1 className="h2 fs-1">
          <i className="bi bi-bag-heart mx-2"></i>
          Products
        </h1>
        {Cookies.get("isAdmin") === "true" ? AddProductBtn() : null}
      </div>

      <section className="container-fluid">
        <div className="row">
          {Cookies.get("isAdmin") === "true" ? Admin() : Supervisor()}
        </div>
      </section>

      {Cookies.get("isAdmin") === "true" ? AdminModals() : SupervisorModals()}
    </>
  );
}

export default ProductsPage;
