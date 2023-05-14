import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column">
      <p className="fs-1 fw-bold text-uppercase">Not Found</p>
      <Link
        to={"/Dashboard"}
        className="text-decoration-none link-secondary fs-3"
      >
        Go back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
