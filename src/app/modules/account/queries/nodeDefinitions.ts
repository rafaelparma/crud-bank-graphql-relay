import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
  } from 'graphql';
  import {
    nodeDefinitions,
    fromGlobalId,
    globalIdField,
    connectionDefinitions
  } from 'graphql-relay';
  import { AccountModel } from '../../../database/schemas/account';
 
  
  const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId: string) => {
      const { type, id } = fromGlobalId(globalId);
      if (type === 'Account') {
        return AccountModel.findById(id).exec();
      }
      return null;
    },
    (obj: any) => {
      if (obj instanceof AccountModel) {
        return accountType;
      }
      return null;
    }
  );

   
  const accountType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Account',
    fields: () => ({
      id: globalIdField('Account'),
      name: { type: GraphQLString },
      balance: { type: GraphQLInt },
      createdAt: { 
        type: GraphQLString,
        resolve: (accounts) => new Date(accounts.createdAt).toISOString()
      },
      updatedAt: { 
        type: GraphQLString,
        resolve: (accounts) => new Date(accounts.updatedAt).toISOString()
      }
    }),
    interfaces: [nodeInterface]
  });

  const { connectionType: accountConnection } = connectionDefinitions({
    name: 'Account',
    nodeType: accountType
  });
  
  export { nodeInterface, nodeField, accountType, accountConnection };