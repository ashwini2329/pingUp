import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./Auth/Login";
import NotFound from "./pages/NotFound";
import Signup from "./Auth/Signup";
import Home from "./components/Home";
import Redirect from "./pages/Redirect";
import ProtectedRoute from "./pages/ProtectedRoute";
import Content from "./components/Content";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import EditProfile from "./components/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Redirect />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <NotFound />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Content />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "edit-profile/:id",
        element: <EditProfile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
