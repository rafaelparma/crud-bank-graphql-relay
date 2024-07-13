import { mergeSchemas } from '@graphql-tools/schema';
import { schema as accountSchema } from '../modules/account/schema';
import { schema as transactionSchema } from '../modules/transaction/schema';

const graphqlSchemas = mergeSchemas({
    schemas: [
        accountSchema,
        transactionSchema
    ],
});

export { graphqlSchemas }


