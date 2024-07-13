import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLFieldConfigMap
  } from 'graphql';
  
  import { nodeField, nodeInterface } from './queries/nodeDefinitions';
  import { transactionsQuery } from './queries/transactions';
  import { transactionByIdQuery } from './queries/transactionById';
  import { createTransactionMutation } from './mutations/createTransaction';

  
  const queryType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: (): GraphQLFieldConfigMap<any, any> => ({
      node: nodeField,
      transactions: transactionsQuery,
      transactionById: transactionByIdQuery,
    })
  });
  
  const mutationType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Mutation',
    fields: (): GraphQLFieldConfigMap<any, any> => ({
      createTransaction: createTransactionMutation
    })
  });
  
  const schema: GraphQLSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    types: [nodeInterface]
  });
  
  export { schema };
  