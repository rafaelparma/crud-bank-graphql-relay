import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
  } from 'graphql';
  import {
    nodeDefinitions,
    fromGlobalId,
    toGlobalId,
    globalIdField,
    connectionDefinitions,
  } from 'graphql-relay';
import { accountLoader } from '../../account/queries/accountLoader';
import { TransactionModel } from '../../../database/schemas/transaction';
  
  
  
  const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId: string) => {
      const { type, id } = fromGlobalId(globalId);
      if (type === 'Transaction') {
        return TransactionModel.findById(id).exec();
      }
      return null;
    },
    (obj: any) => {
      if (obj instanceof TransactionModel) {
        return transactionType;
      }
      return null;
    }
  );


  
  const transactionType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Transaction',
    fields: () => ({
      id: globalIdField('Transaction'),
      fromAccountId: { 
        type: GraphQLID,
        resolve: (transaction) => toGlobalId('Account', transaction.fromAccountId.toString())
      },
      fromAccountName: { 
        type: GraphQLString,
        resolve: async (transaction) => {
          const fromAccountId = await accountLoader.load(transaction.fromAccountId.toString());
          return fromAccountId ? fromAccountId.name : null;
        }
      },
      toAccountId: { 
        type: GraphQLID,
        resolve: (transaction) => toGlobalId('Account', transaction.toAccountId.toString())
    },
      toAccountName: { 
        type: GraphQLString,
        resolve: async (transaction) => {          
          const fromAccountId = await accountLoader.load(transaction.toAccountId.toString());          
          return fromAccountId ? fromAccountId.name : null;
        }
      },    
      amount: { type: GraphQLInt },
      createdAt: { 
        type: GraphQLString,
        resolve: (transaction) => new Date(transaction.createdAt).toISOString()
      },
      
    }),
    interfaces: [nodeInterface]
  });

  const { connectionType: transactionConnection } = connectionDefinitions({
    name: 'Transaction',
    nodeType: transactionType
  });
  

  export { nodeInterface, nodeField, transactionType, transactionConnection };