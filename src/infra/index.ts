import { App } from 'aws-cdk-lib';
import { StoreProductsLambdaStack } from './stacks/StoreProductsLambdaStack';
import { StoreUsersLambdaStack } from './stacks/StoreUsersLambdaStack';
import { StoreDynamoStack } from './stacks/StoreDynamoStack';
import { StoreApiStack } from './stacks/StoreAPIStack';
import { StoreAuthStack } from './stacks/StoreAuthStack';

const app = new App();
const dynamoStack = new StoreDynamoStack(app, 'StoreDynamoStack');
const storeProductsLambdaStack = new StoreProductsLambdaStack(app, 'StoreProductsLambdaStack', {
  productsTable: dynamoStack.productTable
});
const storeUsersLambdaStack = new StoreUsersLambdaStack(app, 'StoreUsersLambdaStack', {
  usersTable: dynamoStack.userTable
});
const storeAuthStack = new StoreAuthStack(app, 'StoreAuthStack');
new StoreApiStack(app, 'StoreApiStack', {
  lambdaIntegration: {
    productsIntegration: storeProductsLambdaStack.lambdaIntegration,
    usersIntegration: storeUsersLambdaStack.lambdaIntegration
  },
  userPool: storeAuthStack.userPool
});
