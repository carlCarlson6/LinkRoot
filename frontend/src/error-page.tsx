import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log("error");
    return (
        <div>
            <h1>oops! :(</h1>
            <p>sorry, nothing to see here</p>
        </div>
    );   
}