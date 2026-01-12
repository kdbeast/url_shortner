import App from "../App";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import Dashboard from "../pages/Dashboard";
import { createRootRoute, createRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: App,
});

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authRoute,
  dashboardRoute,
]);
