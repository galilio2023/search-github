import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQl error]:Message ${message},Location:${locations},Path:${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network Error]:${networkError}`);
  }
});

const GITHUB_GRAOHQL_API = "https://api.github.com/graphql";

const httpLink = new HttpLink({
  uri: GITHUB_GRAOHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
