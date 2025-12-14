import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import "./styles/app.css";

const role = "ADMIN";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  headers: { "x-role": role },
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App role={role} />
  </ApolloProvider>
);
