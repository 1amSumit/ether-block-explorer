import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./LandingPage";
import DetailsPage from "./Details";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/details/:id",
    element: <DetailsPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
