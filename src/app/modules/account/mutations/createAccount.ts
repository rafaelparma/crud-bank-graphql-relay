import { GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { AccountModel } from '../../../database/schemas/account';
import { accountType } from '../queries/nodeDefinitions';

  const createAccountMutation = mutationWithClientMutationId({
    name: 'CreateAccount',
    description: 'Create an Account',
    inputFields: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      balance: { type: new GraphQLNonNull(GraphQLInt) }
    },
    outputFields: {
      account: {
        type: accountType,
        resolve: (payload) => payload.account
      }
    },
    mutateAndGetPayload: async (args) => {
      const accountCheck = await AccountModel.find({ name: args.name }).exec();        
      if (accountCheck.length > 0 ) {
        throw new Error('The account name already exists');
      } 
           
      const account = new AccountModel({
        name: args.name,
        balance: args.balance
      });
      await account.save();

      return { account };
    }
  });

  export { createAccountMutation }