import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {setContext} from '@apollo/client/link/context';

const uri = 'http://localhost:1337/graphql'; // <-- add the URL of the GraphQL server here

const authLink = setContext((_, {headers}) => {
  const token = "d825d4b97258384caecc5c7e5a17969eeadd00c064a9e786472e754a95cb815c6d2987c1e9d35851c60231de2abbe9f63f05e5fa4dd43068928a839ae358a31d83991c1dcef99c35202ead98b858792016620dcb3edf04a1b7c650e34cb0c4f614fd8effdf9c8fd486ec97bb5276f17460476e13e23549ccf89056d8bd5c278a"
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``
    }
  }
})


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: authLink.concat(httpLink.create({uri})),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
