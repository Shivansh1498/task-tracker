import { createBrowserRouter } from "react-router-dom";
import RegisterUserPage from "./pages/RegisterUserPage";
import LoginUserPage from "./pages/LoginUserPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <HomePage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/register",
    element: <RegisterUserPage />,
  },
  {
    path: "/login",
    element: <LoginUserPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
