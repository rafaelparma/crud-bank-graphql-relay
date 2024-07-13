import { GraphQLObjectType, GraphQLSchema, GraphQLFieldConfigMap } from 'graphql';
import { nodeField, nodeInterface } from './queries/nodeDefinitions';
import { accountsQuery } from './queries/accounts';
import { accountByIdQuery } from './queries/accountById';
import { createAccountMutation } from './mutations/createAccount';
import { updateAccountMutation } from './mutations/updateAccount';
import { deleteAccountMutation } from './mutations/deleteAccount';
  
  const queryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: (): GraphQLFieldConfigMap<any, any> => ({
      node: nodeField,
      accounts: accountsQuery,
      accountById: accountByIdQuery,
    })
  });
  
  const mutationType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Mutation',
    fields: (): GraphQLFieldConfigMap<any, any> => ({
      createAccount: createAccountMutation,
      updateAccount: updateAccountMutation,
      deleteAccount: deleteAccountMutation
    })
  });
  
  const schema: GraphQLSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    types: [nodeInterface]
  });
  
  export { schema };
  