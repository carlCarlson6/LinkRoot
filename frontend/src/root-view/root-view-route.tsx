import { RouteObject } from "react-router-dom";
import Layout from "./layout";
import RootViewPage from "./page";

export const rootViewRoute: RouteObject = {
    path: "/:slug",
    element: (
        <Layout>
            <RootViewPage />
        </Layout>
    )
}
