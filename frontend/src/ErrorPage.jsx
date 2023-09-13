import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className="h-screen bg-[url('/src/assets/desert.jpg')] bg-center text-center text-white"
      id="error-page"
    >
      <h1 className="text-5xl mb-5">I Know You Are Looking For Water, But This Is A Desert</h1>
      <p className="text-5xl">404</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
