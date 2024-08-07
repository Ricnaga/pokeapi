"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container } from "./_components/Container";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Page() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Container />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
