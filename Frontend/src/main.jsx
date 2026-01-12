import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routing/routeTree";
import { createRouter } from "@tanstack/react-router";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
