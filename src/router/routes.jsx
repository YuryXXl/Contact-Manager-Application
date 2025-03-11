import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Home from "../pages/home/Home.jsx";
import Login from "../pages/login/Login.jsx";
import Signup from "../pages/signup/Signup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Favorites from "../pages/favorites/Favorites.jsx";
import AddContact from "../pages/addContact/AddContact.jsx";
import EditContact from "../pages/editContact/EditContact.jsx";
import Profile from "../pages/profile/Profile.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addContact",
        element: (
          <ProtectedRoute>
            <AddContact />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-contact/:id",
        element: (
          <ProtectedRoute>
            <EditContact />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
