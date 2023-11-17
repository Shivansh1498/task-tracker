import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const userToken = useSelector((state) => state.auth?.userInfo?.token);

  return userToken ? children : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoutes;
