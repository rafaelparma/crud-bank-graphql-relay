import { GraphQLID, GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
  import { AccountModel, IAccount } from '../../../database/schemas/account';
  import { TransactionModel } from '../../../database/schemas/transaction';
  import { transactionType } from '../queries/nodeDefinitions';
import { Document } from 'mongoose';

const createTransactionMutation = mutationWithClientMutationId({
    name: 'CreateTransaction',
    description: 'Create a new Transaction',
    inputFields: {
      fromAccountId: { type: GraphQLNonNull(GraphQLID) },
      toAccountId: { type: GraphQLNonNull(GraphQLID) },
      txId: { type: GraphQLNonNull(GraphQLString) },
      amount: { type: GraphQLNonNull(GraphQLInt) },
    },
    outputFields: {
      transaction: {
        type: transactionType,
        resolve: (payload) => payload.transaction
      }
    },
    mutateAndGetPayload: async (args) => {

      try {

        const transaction_txid = await TransactionModel.find({txId: args.txId}).exec();
        if (transaction_txid.length > 0 ) {
          throw new Error (`Transaction ID ${args.txId} already exists`);
        }

        const fromAccountIdGlobalId = fromGlobalId(args.fromAccountId).id;
        const toAccountIdGlobalId = fromGlobalId(args.toAccountId).id;

        const fromAccountId = await AccountModel.findById(fromAccountIdGlobalId);
        const toAccountId = await AccountModel.findById(toAccountIdGlobalId);      

        if (!fromAccountId || !toAccountId) {
          throw new Error ('fromAccountId and/or toAccountId not found');
        }

        if (fromAccountId.balance < args.amount) {
          throw new Error ('Insufficient funds');
        }

        const transaction = new TransactionModel({
          fromAccountId: fromAccountIdGlobalId,
          toAccountId: toAccountIdGlobalId,
          txId: args.txId,
          amount: args.amount,
        });

        await Promise.all([
            transaction.save(),
            fromAccountId.balance -= args.amount,
            await fromAccountId.save(),
            toAccountId.balance += args.amount,
            await toAccountId.save()            
        ]);
          
        return { transaction };

      } catch (error) {
        throw new Error(error as string);
      }
            
    }
  });

  export { createTransactionMutation }