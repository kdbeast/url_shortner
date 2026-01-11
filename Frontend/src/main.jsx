import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <QueryClientProvider> */}
      <App />
    {/* </QueryClientProvider> */}
  </StrictMode>
);
