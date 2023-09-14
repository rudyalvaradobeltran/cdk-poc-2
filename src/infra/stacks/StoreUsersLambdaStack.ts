import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
  usersTable: ITable;
}

export class StoreUsersLambdaStack extends Stack {
  public readonly lambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const lambdaFunction = new NodejsFunction(this, 'StoreUsersLambdaFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: (join(__dirname, '..','..', 'services', 'users', 'index.ts')),
      environment: {
        TABLE_NAME: 'Users'
      }
    });

    lambdaFunction.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.usersTable.tableArn],
      actions:[
        'dynamodb:PutItem',
        'dynamodb:GetItem'
      ]
    }));
    
    this.lambdaIntegration = new LambdaIntegration(lambdaFunction);
  }
}