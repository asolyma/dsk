import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const http = new HttpLink({ uri: "http://localhost:3000/api/graphql" });

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: http,
  cache,
});

export default client;
