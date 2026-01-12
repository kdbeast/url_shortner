import "./index.css";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./store/slice/store";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routing/routeTree";
import { createRouter } from "@tanstack/react-router";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient, store } });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
