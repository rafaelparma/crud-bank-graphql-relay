import { GraphQLFieldConfig } from 'graphql';
import { connectionArgs, ConnectionArguments, connectionFromArray } from 'graphql-relay';
import { TransactionModel } from '../../../database/schemas/transaction';
import { transactionConnection } from '../queries/nodeDefinitions';
 
  const transactionsQuery: GraphQLFieldConfig<any, any> = {
    type: transactionConnection,
    args: connectionArgs,     
    description: 'Get all Transactions',   
    resolve: async (parent, args: ConnectionArguments) => {          
        const transactions = await TransactionModel.find().exec();
        return connectionFromArray(transactions, args);
    }
  };
 
  export { transactionsQuery };
  