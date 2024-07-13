import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { AccountModel } from '../../../database/schemas/account';
import { accountType } from '../queries/nodeDefinitions';
 
const accountByIdQuery: GraphQLFieldConfig<any, any> = {
    type: accountType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    description: 'Get an Account By ID',
    resolve: (parent, args) => AccountModel.findById(fromGlobalId(args.id).id).exec()
};

export { accountByIdQuery };
  