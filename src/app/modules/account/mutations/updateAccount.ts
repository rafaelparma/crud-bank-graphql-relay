import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import { AccountModel } from '../../../database/schemas/account';
import { accountType } from '../queries/nodeDefinitions';

  
const updateAccountMutation = mutationWithClientMutationId({
    name: 'UpdateAccount',
    description: 'Update an Account',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
      account: {
        type: accountType,
        resolve: (payload) => payload.account
      }
    },
    mutateAndGetPayload: async (args) => {
      const { id, name } = args;

      const accountCheck = await AccountModel.find({ name: args.name }).exec();        
      if (accountCheck.length > 0 ) {
        throw new Error('The account name already exists');
      }       

      const accountId = fromGlobalId(id).id;
      const account = await AccountModel.findById(accountId).exec();
      if (!account) {
        throw new Error('Account not found');
      }
      
      account.name = name;      
      await account.save();
      return { account };
      
    }
  });

  export { updateAccountMutation }