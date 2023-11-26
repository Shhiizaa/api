import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserContextProvider from "./components/UserContextProvider";
import RequireAuth from "./components/RequireAuth";
import Login from "./routes/Login";
import Home from "./routes/Home";
import New from "./routes/New";
import Edit from "./routes/Edit";
import Note, { loader as noteLoader } from "./routes/Note";
import About from "./routes/About";
import SignUp from "./routes/SignUp";
import ErrorPage from "./routes/ErrorPage";
import Notes, { loader as notesLoader } from "./routes/Notes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      { path: "/", element: <About /> },
      { path: "/notes", loader: notesLoader, element: <Notes /> },
      { path: "/notes/new", element: <New /> },
      { path: "/notes/edit", element: <Edit /> },
      { path: "/notes/:id", loader: noteLoader, element: <Note /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>
  );
}

export default App;
