import React from "react";
import ReactDOM from "react-dom/client";
import { ForceGraph } from "./components/ForceGraph";
import { MenuBar } from "./components/MenuBar";
import { ErrorBoundary } from "react-error-boundary";
import { err } from "./components/err";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={err}>
      <QueryClientProvider client={queryClient}>
        <MenuBar />
        <ForceGraph />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
