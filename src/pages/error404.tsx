import NotFoundError from "../assets/notFoundError.svg?react";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <>
      <div className="text-center mx-auto">
        <div className="mx-auto w-1/2 lg:w-1/3 text-end">
          <NotFoundError />
          <a
            className="opacity-30 text-xs"
            href="https://storyset.com/web"
            aria-label="Attribution link"
          >
            Web illustrations by Storyset
          </a>
        </div>
        <h1>Error 404</h1>
        <h2>Page not found</h2>
        <p>
          Go back to{" "}
          <Link
            to="/"
            className="underline"
            aria-label="Link back to home"
          >
            Home
          </Link>
        </p>
      </div>
    </>
  );
}

export default Error404;
