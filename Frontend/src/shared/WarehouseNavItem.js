import React from "react";
import { Link } from "react-router-dom";

function WarehouseNavItem(props) {
  return (
    <li>
      <Link
        to={"/warehouses/" + props.id}
        className="link-dark d-inline-flex text-decoration-none rounded"
      >
        <i className="bi bi-house-gear me-2 fs-6"></i>
        {props.name}
      </Link>
    </li>
  );
}

export default WarehouseNavItem;
