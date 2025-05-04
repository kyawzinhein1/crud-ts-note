import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import NoteList from "./components/NoteList.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <NoteList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
