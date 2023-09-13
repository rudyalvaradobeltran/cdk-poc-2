import { App } from 'aws-cdk-lib';
import { StoreDynamoStack } from './stacks/StoreDynamoStack';
import { StoreLambdaStack } from './stacks/StoreLambdaStack';
import { StoreApiStack } from './stacks/StoreAPIStack';

const app = new App();
const dynamoStack = new StoreDynamoStack(app, 'DynamoStack');
const lambdaStack = new StoreLambdaStack(app, 'LambdaStack', {
  tables: [dynamoStack.userTable, dynamoStack.productTable]
});
new StoreApiStack(app, 'ApiStack', {
  lambdaIntegration: lambdaStack.lambdaIntegration
});
