"use client";
import Link from "next/link";

enum Links {
  CLIENT = "client",
  SERVER = "server",
  REACTQUERY = "react-query",
}

export function TopBar() {
  return (
    <nav>
      <span className="mr-4">
        Essa aplicacao pode ser visualizada nos links:
      </span>
      {Object.values(Links).map((url, index) => (
        <Link key={url} href={!index ? "/" : url} className="mr-4 text-xl">
          {url}
        </Link>
      ))}
    </nav>
  );
}
