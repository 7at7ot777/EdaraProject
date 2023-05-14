import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./shared/MainPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Supervisors from "./pages/Admin/Supervisors";
import Warehouses from "./pages/Admin/Warehouses";
import Requests from "./pages/Admin/Requests";
import ProductsPage from "./pages/ProductsPage";
import NotFound from "./shared/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
        element: <MainPage />,
        children: [
          {
            path: "/Dashboard",
            element: <Dashboard />,
          },
          {
            path: "/Supervisors",
            element: <Supervisors />,
          },
          {
            path: "/Warehouses",
            element: <Warehouses />,
          },
          {
            path: "/Warehouses/:id",
            element: <ProductsPage />,
          },
          {
            path: "/Requests",
            element: <Requests />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
          {
            path: "/NotFound",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);
