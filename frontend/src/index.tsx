import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  // uri: 'http://localhost:8080/query',
  // uri: 'https://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080/query',
  // uri: 'http://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080/query',
  uri: 'https://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080/query',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
