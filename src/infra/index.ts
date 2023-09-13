import { App } from 'aws-cdk-lib';
import { StoreProductsLambdaStack } from './stacks/StoreProductsLambdaStack';
import { StoreUsersLambdaStack } from './stacks/StoreUsersLambdaStack';
import { StoreDynamoStack } from './stacks/StoreDynamoStack';
import { StoreApiStack } from './stacks/StoreAPIStack';

const app = new App();
const dynamoStack = new StoreDynamoStack(app, 'DynamoStack');
const storeProductsLambdaStack = new StoreProductsLambdaStack(app, 'StoreProductsLambdaStack', {
  productsTable: dynamoStack.productTable
});
const storeUsersLambdaStack = new StoreUsersLambdaStack(app, 'StoreUsersLambdaStack', {
  usersTable: dynamoStack.userTable
});
new StoreApiStack(app, 'ApiStack', {
  lambdaIntegration: {
    productsIntegration: storeProductsLambdaStack.lambdaIntegration,
    usersIntegration: storeUsersLambdaStack.lambdaIntegration
  }
});
