import Cookies from "js-cookie";

const DeleteUserCookies = () => {
  Cookies.remove("id");
  Cookies.remove("name");
  Cookies.remove("email");
  Cookies.remove("warehouseId");
  Cookies.remove("isAdmin");
  Cookies.remove("isActive");
  Cookies.remove("phone");
  Cookies.remove("token");
  window.location.replace("/");
};

export default DeleteUserCookies;
