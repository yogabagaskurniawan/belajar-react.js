import { Header } from "../components/Header";

export function NotFound({carts}) {
  return (
    <div>
      <Header carts={carts} />
      <h1 style={{ marginTop: "100px" }}>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}