/* eslint-disable react/display-name */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { memo } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const Wrapper = memo(({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
});

export default Wrapper;
