import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { UserList } from "../pages/user-list";
import { AddUser } from "../pages/add-user";
import { EditUser } from "../pages/edit-user";
import { UserDetails } from "../pages/user-details";

export const paths = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <UserList /> },
      { path: "add", element: <AddUser /> },
      { path: "user/edit/:key", element: <EditUser /> },
      { path: "user/details/:key", element: <UserDetails /> },
    ],
  },
]);
