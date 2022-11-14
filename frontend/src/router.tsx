import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "./error-page";
import { rootViewRoute } from "./root-view/root-view-route";

const baseRoute: RouteObject = {
	path: "/",
	element: <ErrorPage />,
	errorElement: <ErrorPage />
};

export const router = createBrowserRouter([
	baseRoute,
    rootViewRoute
]);