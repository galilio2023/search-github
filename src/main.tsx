import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient.ts";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
    <Toaster />
  </ApolloProvider>
);
