import connectMongoDB, { disconnectMongoDB } from '../database/index';
import { app } from '../../app/app';
import request from 'supertest';


describe('Test sequence of accounts & transactions routes - crud-bank-graphql-relay', () => {

  beforeAll(async () => {
    connectMongoDB();    
  });

  afterAll(async () => {    
    disconnectMongoDB();
  });

  let accountId1: string;
  let accountId2: string;
  let accountId3: string;

  const accountName1 = "Alice Johnson";
  const accountName2 = "Henry Fisher";
  const accountName3 = "Grace Clark";

  const accountBalance1 = 5500;
  const accountBalance2 = 8600;
  const accountBalance3 = 12100;

  const transactionAmmount1 = 300;
  const transactionAmmount2 = 7800;

  /* Accounts Tests */

  test('1-mutation-CreateAccount - create 1th account', async () => {
    const createAccountMutation = `
      mutation CreateAccount {
        createAccount(input: { 
            name: "${accountName1}", 
            balance: ${accountBalance1} }) {
          account {
            id
            name
            balance
          }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createAccountMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createAccount.account).toHaveProperty('id');
    expect(response.body.data.createAccount.account.name).toBe(accountName1);
    expect(response.body.data.createAccount.account.balance).toBe(accountBalance1);

    accountId1 = response.body.data.createAccount.account.id;
  });


  test('2-mutation-CreateAccount - create 2nd account', async () => {
    const createAccountMutation = `
      mutation CreateAccount {
        createAccount(input: { 
            name: "${accountName2}", 
            balance: ${accountBalance2} }) {
          account {
            id
            name
            balance
          }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createAccountMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createAccount.account).toHaveProperty('id');
    expect(response.body.data.createAccount.account.name).toBe(accountName2);
    expect(response.body.data.createAccount.account.balance).toBe(accountBalance2);

    accountId2 = response.body.data.createAccount.account.id;

  });


  test('3-mutation-CreateAccount - create 3rd account', async () => {
    const createAccountMutation = `
      mutation CreateAccount {
        createAccount(input: { 
            name: "${accountName3}", 
            balance: ${accountBalance3} }) {
          account {
            id
            name
            balance
          }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createAccountMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createAccount.account).toHaveProperty('id');
    expect(response.body.data.createAccount.account.name).toBe(accountName3);
    expect(response.body.data.createAccount.account.balance).toBe(accountBalance3);

    accountId3 = response.body.data.createAccount.account.id;

  });


  test('4-mutation-UpdateAccount - update 3rd account', async () => {
    const createAccountMutation = `
      mutation UpdateAccount {
        updateAccount(input: { 
            id: "${accountId3}", 
            name: "${accountName1+" I"}" }) {
          account {
            id
            name
            balance
          }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createAccountMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.updateAccount.account).toHaveProperty('id');
    expect(response.body.data.updateAccount.account.name).toBe(accountName1+" I");

  });

  test('5-mutation-DeleteAccount - delete 3rd account', async () => {
    const createAccountMutation = `
      mutation DeleteAccount {
        deleteAccount(input: { 
            id: "${accountId3}" }) {
          deletedAccountId          
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createAccountMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.deleteAccount.deletedAccountId).toBe(accountId3)

  });  

  /* Transactions Tests */

  test('6-mutation-CreateTransaction - create a transaction', async () => {
    const createTransactionMutation = `
      mutation CreateTransaction {
        createTransaction (input: { 
            fromAccountId: "${accountId1}", 
            toAccountId: "${accountId2}", 
            amount: ${transactionAmmount1} }) {
          transaction {
            id
            fromAccountId
            toAccountId
            amount
          }
        }
      }
    `;    

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createTransactionMutation });

    expect(response.status).toBe(200);
    expect(response.body.data.createTransaction.transaction).toHaveProperty('id');
    expect(response.body.data.createTransaction.transaction.amount).toBe(transactionAmmount1);

    const fromAccountId = response.body.data.createTransaction.transaction.fromAccountId;
    const toAccountId = response.body.data.createTransaction.transaction.toAccountId;

    expect(fromAccountId).toBe(accountId1);
    expect(toAccountId).toBe(accountId2);

  });
 
  test('7-query-Transactions - verify transaction\'s accounts and amount', async () => {
    const getTransactionsQuery = `
      query Transactions {
        transactions {
          edges {
            node {
              id
              fromAccountId
              toAccountId
              amount
              createdAt
            }
            cursor
          }
          pageInfo {
            startCursor
            endCursor  
            hasPreviousPage    
            hasNextPage
          }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: getTransactionsQuery });

    expect(response.status).toBe(200);
    expect(response.body.data.transactions.edges).toHaveLength(1);

    const transaction = response.body.data.transactions.edges[0];

    expect(transaction.node.fromAccountId).toBe(accountId1);
    expect(transaction.node.toAccountId).toBe(accountId2);

    expect(transaction.node.amount).toBe(transactionAmmount1);
    
  });

  test('8-query-Accounts - verifiy accounts balance after transaction', async () => {
    const getAccountsQuery = `
      query Accounts {
        accounts {
          edges {
            node {
              id
              name
              balance
            }
            cursor
          }
          pageInfo {
            startCursor
            endCursor  
            hasPreviousPage    
            hasNextPage
          }
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: getAccountsQuery });

    expect(response.status).toBe(200);
    expect(response.body.data.accounts.edges).toHaveLength(2);

    const account1 = response.body.data.accounts.edges.find((edge: any) => edge.node.id === accountId1);
    const account2 = response.body.data.accounts.edges.find((edge: any) => edge.node.id === accountId2);
    
    expect(account1.node.name).toBe(accountName1);
    expect(account1.node.balance).toBe(accountBalance1-transactionAmmount1);

    expect(account2.node.name).toBe(accountName2);
    expect(account2.node.balance).toBe(accountBalance2+transactionAmmount1);
  });


  test('9-mutation-CreateTransaction - try to create a transaction with insufficient funds', async () => {
    const createTransactionMutation = `
      mutation CreateTransaction{
        createTransaction (input: { 
            fromAccountId: "${accountId1}", 
            toAccountId: "${accountId2}", 
            amount: ${transactionAmmount2} }) {
          transaction {
            id
            fromAccountId
            toAccountId
            amount
          }
        }
      }
    `;    

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createTransactionMutation });

      expect(response.status).toBe(200);
      expect(response.body.errors[0].message).toBe('Error: Insufficient funds')

  });

  test('10-mutation-DeleteAccount - try to delete an account with transaction', async () => {
    const createAccountMutation = `
      mutation DeleteAccount {
        deleteAccount(input: { 
            id: "${accountId1}" }) {
          deletedAccountId          
        }
      }
    `;

    const response = await request(app.callback())
      .post('/graphql')
      .send({ query: createAccountMutation });

    expect(response.status).toBe(200);
    expect(response.body.errors[0].message).toBe('This Account has sent/received transactions, cannot be deleted')
  });  

});
