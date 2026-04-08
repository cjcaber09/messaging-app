import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Register from "./components/Register.tsx";
import { AuthProvider } from "./context/authProvider.tsx";
import { store } from "./store";
import { Provider } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </StrictMode>,
);
