import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { AccountModel } from '../../../database/schemas/account';
import { TransactionModel } from '../../../database/schemas/transaction';

const deleteAccountMutation = mutationWithClientMutationId({
    name: 'DeleteAccount',
    description: 'Create an Account',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    outputFields: {
      deletedAccountId: {
        type: GraphQLID,
        resolve: (payload) => payload.deletedAccountId
      }
    },
    mutateAndGetPayload: async (args) => {
      const { id } = args;
      const accountId = fromGlobalId(id).id;
      
      const transactionToAccount = await TransactionModel.find({ toAccountId : accountId}).exec();
      const transactionFromAccount = await TransactionModel.find({ fromAccountId : accountId}).exec();      
      if (transactionFromAccount.length > 0 || transactionToAccount.length > 0) {
        throw new Error('This Account has sent/received transactions, cannot be deleted');
      }  
      
      const account = await AccountModel.findByIdAndDelete(accountId).exec();
      if (!account) {
        throw new Error('Account not found');
      }
      return { deletedAccountId: id };
    }
  });


  export { deleteAccountMutation };