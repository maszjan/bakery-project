import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import AdminDashboardPage from "./pages/Admin/Dashboard";
import AdminClientsPage from "./pages/Admin/ClientsList";
import AdminIngredientsPage from "./pages/Admin/IngredientsList";
import AdminOrdersPage from "./pages/Admin/OrdersList";
import AdminProductsPage from "./pages/Admin/ProductsList";
import ClientDashboardPage from "./pages/Client/Dashboard";
import RegisterPage from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "/admin/clientslist",
        element: <AdminClientsPage />,
      },
      {
        path: "/admin/orderslist",
        element: <AdminOrdersPage />,
      },
      {
        path: "/admin/productslist",
        element: <AdminProductsPage />,
      },
      {
        path: "/admin/ingredientslist",
        element: <AdminIngredientsPage />,
      },
      {
        path: "/client/dashboard",
        element: <ClientDashboardPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
