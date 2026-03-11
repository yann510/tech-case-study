"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SWRConfig } from "swr";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, retry: 1 },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(`${API_URL}${url}`).then((res) => {
              if (!res.ok) throw new Error("Request failed");
              return res.json();
            }),
          revalidateOnFocus: false,
        }}
      >
        {children}
      </SWRConfig>
    </QueryClientProvider>
  );
}
