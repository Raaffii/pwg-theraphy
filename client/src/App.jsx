import { BrowserRouter, useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { routes } from "./router/routes";
import { AuthProvider } from "./context/AuthContext";
function AppRoutes() {
  const routeElements = useRoutes(routes);
  return routeElements;
}

if (window.location.hostname.startsWith("www.")) {
  const newHost = window.location.hostname.replace("www.", "");
  const newUrl = `${window.location.protocol}//${newHost}${
    window.location.port ? `:${window.location.port}` : ""
  }${window.location.pathname}${window.location.search}`;
  window.location.href = newUrl;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          // position="top-center"
          toastOptions={{
            success: {
              style: {
                border: "1px solid green",
              },
            },
            error: {
              style: {
                border: "1px solid red",
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
