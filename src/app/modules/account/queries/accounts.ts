import { GraphQLFieldConfig } from 'graphql';
import { connectionArgs, ConnectionArguments, connectionFromArray } from 'graphql-relay';
import { AccountModel } from '../../../database/schemas/account';
import { accountConnection } from '../queries/nodeDefinitions';
 
const accountsQuery: GraphQLFieldConfig<any, any> = {
    type: accountConnection,
    args: connectionArgs,
    description: 'Get all Accounts',
    resolve: async (parent, args: ConnectionArguments) => {
        const accounts = await AccountModel.find().exec();
        return connectionFromArray(accounts, args);
    }
};

export { accountsQuery };
  