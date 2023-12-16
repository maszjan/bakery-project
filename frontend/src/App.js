import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./store/slices/userSlice";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ErrorPageRole from "./pages/ErrorPageRole";
import HomePage from "./pages/Home";
import AdminDashboardPage from "./pages/Admin/Dashboard";
import AdminClientsPage from "./pages/Admin/ClientsList";
import AdminIngredientsPage from "./pages/Admin/IngredientsList";
import AdminOrdersPage from "./pages/Admin/OrdersList";
import AdminProductsPage from "./pages/Admin/ProductsList";
import ClientDashboardPage from "./pages/Client/Dashboard";
import RegisterPage from "./pages/Register";
import NewOrder from "./pages/Client/NewOrder";
import ProductsList from "./pages/Client/ProductsList";
import ClientProfile from "./pages/Client/ClientProfile";
import OrderList from "./pages/Client/OrdersList";


function App() {
  const user = useSelector(selectUser);
  const userRole = user?.role;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/admin/*",
          element: userRole === "admin" ? <RootLayout /> : <ErrorPageRole />,
          children: [
            { path: "dashboard", element: <AdminDashboardPage /> },
            { path: "clientslist", element: <AdminClientsPage /> },
            { path: "ingredientslist", element: <AdminIngredientsPage /> },
            { path: "orderslist", element: <AdminOrdersPage /> },
            { path: "productslist", element: <AdminProductsPage /> },
          ],
        },
        {
          path: "/client/*",
          element: userRole === "client" ? <RootLayout /> : <ErrorPageRole />,
          children: [
            { path: "dashboard", element: <ClientDashboardPage /> },
            { path: "neworder", element: <NewOrder /> },
            { path: "orderslist", element: <OrderList /> },
            { path: "productlist", element: <ProductsList /> },
            { path: "profile", element: <ClientProfile /> },
        ],
        },
        { path: "/register", element: <RegisterPage /> },
        
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
