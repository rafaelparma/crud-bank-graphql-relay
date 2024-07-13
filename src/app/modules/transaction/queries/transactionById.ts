import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { TransactionModel } from '../../../database/schemas/transaction';
import { transactionType } from '../queries/nodeDefinitions';
 
  const transactionByIdQuery: GraphQLFieldConfig<any, any> = {
    type: transactionType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    description: 'Get a Transaction By ID',
    resolve: (parent, args) => {
        return TransactionModel.findById(fromGlobalId(args.id).id).exec()
    }
  };
 
  export { transactionByIdQuery };
  