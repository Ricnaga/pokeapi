'use client'
import { useFetchQuery } from "./hooks/client";

export default function Page() {
  //limit = pagesize, offset = previous ou next page
  const data = useFetchQuery({
    endpoint: "/pokemon/?offset=1&limit=2",
  });
  console.log(data);

  return (
    <main>
      <h1>Hello</h1>
      <button>CLICA</button>
    </main>
  );
}
